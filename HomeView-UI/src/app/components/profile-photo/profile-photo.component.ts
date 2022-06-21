import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfilePhoto } from 'src/app/models/profile-photo/profile-photo.model';
import { PhotoService } from 'src/app/services/photo.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {

  @ViewChild('photoForm') photoForm: NgForm;
  @ViewChild('photoUploadElement') photoUploadElement: ElementRef;

  photos: ProfilePhoto[] = [];
  photoFile: any;

  constructor(
    private photoService: PhotoService,
    private toastr: ToastrService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.photoService.getByUserId().subscribe(userPhotos => {
      this.photos = userPhotos;
    });
  }

  confirmDelete(photo: ProfilePhoto) {
    photo.deleteConfirm = true;
  }

  cancelDeleteConfirm(photo: ProfilePhoto) {
    photo.deleteConfirm = false;
  }

  deleteConfirmed(photo: ProfilePhoto) {
    this.photoService.delete(photo.photoId).subscribe(() => {
      let index = 0;

      for (let i=0; i<this.photos.length; i++) {
        if (this.photos[i].photoId === photo.photoId) {
          index = i;
        }
      }

      if (index > -1) {
        this.photos.splice(index, 1);
      }

      this.toastr.info("Photo deleted.");
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photoFile = file;
    }
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.photoFile);

    this.photoService.create(formData).subscribe(createdPhoto => {
      
      this.photoForm.reset();
      this.photoUploadElement.nativeElement.value = '';

      this.toastr.info("Photo uploaded");
      this.photos.unshift(createdPhoto);

    });
  }

  updatePhoto(photo: ProfilePhoto) {
    this.accountService.updatePhoto(photo.photoId).subscribe(() => {

      this.toastr.info("Profile picture updated.");
    });
  }

}
