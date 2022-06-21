export class ProfilePhoto {
  constructor (
    public photoId: number,
    public userId: number,
    public publicId: string,
    public imageUrl: string,
    public deleteConfirm: boolean = false
  ){}
}
