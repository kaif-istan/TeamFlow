export const getUserAvatar = (userPicture: string | null, userEmail: string) => {
    return userPicture ?? `https://avatar.vercel.sh/${userEmail}`
}