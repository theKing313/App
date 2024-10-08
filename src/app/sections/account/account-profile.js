
'use client'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CircularProgress } from '@mui/material';
import { useEffect, useMemo, useState } from 'react'
import { api } from '@/app/api';

export const AccountProfile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserInfo();
    }, []);

    const loadUserInfo = async () => {
        try {
            const info = await api.getUserInfo(); // Ваш API-запрос
            setUserInfo(info);
        } catch (error) {
            console.error("Ошибка при загрузке данных пользователя:", error);
        } finally {
            setLoading(false);
        }
    };



    /////////////////////////////// Upload image //////////////////////////
    const [selectedImages, setSelectedImages] = useState([]);


    if (loading) {
        return <CircularProgress />;
    }


    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    <Avatar
                        //
                        // src={selectedImages.length > 0 ? URL.createObjectURL(selectedImages[0]) : values?.photoUrl}
                        sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                        }}
                    />

                    <Typography gutterBottom variant='h5'>
                        {userInfo?.name}
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                        {userInfo?.city} {userInfo?.userInfo}
                    </Typography>
                    <Typography color='text.secondary' variant='body2'>
                        {userInfo?.timezone}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>


                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    // multiple
                    type="file"
                // onChange={handleImageChange}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <label htmlFor="raised-button-file">

                        <Button variant='text' component="span">
                            Upload picture
                        </Button>


                    </label>
                    <Box
                        sx={{
                            display: 'flex', justifyContent: 'center',
                            alignItems: 'center', color: 'green'
                        }}>
                        {/* {posterUploadingId === -1 && selectedImages.length > 0 && <CheckCircleIcon />} */}
                    </Box>
                    {/* {posterUploadingId !== -1 && <CircularProgress />} */}
                </Box>

            </CardActions>
        </Card>
    )
}


















// import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material'
// // pages/profile.tsx
// // import { GetServerSideProps } from 'next';
// import { api } from '@/app/api';
// export const getServerSideProps = async (context) => {
//     try {
//         const userInfo = await api.getUserInfo(); // Предзагрузка данных
//         console.log(userInfo); // Вывод данных в консоль для проверки
//         return { props: { userInfo } };
//     } catch (error) {
//         console.error("Ошибка при получении информации о пользователе:", error);
//         return { props: { userInfo: null } }; // Возвращаем null или объект по умолчанию
//     }
// };
// const AccountProfile = ({ userInfo }) => {
//     console.log(userInfo);

//     if (!userInfo) {
//         return <Typography variant="h6">Не удалось загрузить данные пользователя.</Typography>;
//     }
//     return (
//         <Card>
//             <CardContent>
//                 <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
//                     <Avatar src={userInfo?.photoUrl} sx={{ height: 80, mb: 2, width: 80 }} />
//                     <Typography gutterBottom variant="h5">
//                         {userInfo?.name || "Нет имени"}
//                     </Typography>
//                     <Typography color="text.secondary" variant="body2">
//                         {userInfo?.city || "Нет города"} {userInfo?.timezone || "Нет таймзоны"}
//                     </Typography>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// }
// export default AccountProfile;












