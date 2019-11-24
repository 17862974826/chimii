export const getFontSize = (sourceFontSize) => {
    const sourceWidth = 1920
    const screenWidth = document.body.clientWidth


   
    return sourceFontSize/sourceWidth * screenWidth
}