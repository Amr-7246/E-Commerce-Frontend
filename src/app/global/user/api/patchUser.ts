import axios from "axios"

const PatchUser = async (userId: string, userData: any) => {
    const res = await axios.patch(`http://localhost:3000/user/${userId}`, userData)
    return res.data
}
export const usePatchUser = () => {
    return {
        mutate: (userId: string, userData: any) => PatchUser(userId, userData),
        onSuccess: () => {
            console.log('User updated successfully')
        },
        onError: () => {
            console.log('Error updating user')
        }
    }
}