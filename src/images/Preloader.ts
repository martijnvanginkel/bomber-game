
interface ImageInfo {
    fileName: string
    fileType: string
    width: number
    height: number
}

interface ImageFormat {
    name: string
    image: HTMLImageElement
}

export class Preloader {

    private path: string = './img/'


    constructor() {
        this.loadImages()
    }

    private data: Array<ImageInfo> = [
        {
            fileName: 'player',
            fileType: 'png',
            width: 50,
            height: 50,
        }
    ]

    private loadImages() {

        const images = {
        }

        this.data.forEach(item => {
            const newImage: HTMLImageElement = new Image()
            newImage.src = this.path + item.fileName + '.' + item.fileType
            const imageFormat: ImageFormat = {
                name: item.fileName,
                image: newImage
            }
            Object.assign(images,  imageFormat)
        })
    }
}