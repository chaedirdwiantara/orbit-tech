
// import { PermissionsAndroid } from "react-native"
// import GetLocation from "react-native-get-location";
// import { launchCamera } from "react-native-image-picker";

    
//       const requestCameraPermission = async () => {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             {
//               title: 'Cool Photo App Camera Permission',
//               message:
//                 'Cool Photo App needs access to your camera ' +
//                 'so you can take awesome pictures.',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             },
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             const result = await launchCamera({
//               mediaType: 'photo',
//               // cameraType: 'font',
//             });
//             setpicture(result?.assets[0]?.uri);
//             settoggle(false);
//           } else {
//             console.log('Camera permission denied');
//           }
//         } catch (err) {
//           console.warn(err);
//         }
//       };
    
//       const checkPermissionOFGps = async () => {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//               title: 'Cool Photo App Gps Permission',
//               message:
//                 'Cool Photo App needs access to your Gps ' +
//                 'so you can take awesome pictures.',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             },
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             getCurrentLocation();
//           } else {
//             console.log('Camera permission denied');
//           }
//         } catch (err) {
//           console.warn(err);
//         }
//       };
    
//       const getCurrentLocation = async () => {
//         await GetLocation.getCurrentPosition({
//           enableHighAccuracy: true,
//           timeout: 60000,
//         })
//           .then(location => {
//             if (location) {
//               navigation.navigate('Maps', {
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//                 picture
//               });
//             }
//           })
//           .catch(error => {
//             const {code, message} = error;
//             console.warn(code, message);
//           });
//       };
//     try {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//                 title:'Cool Photo App Camera Permission',
//                 message: 'Cool Photo App needs access to your camera ' +
//                 'so you can take awesome pictures.',
//                 buttonNeutral: 'Aske Me Later',
//                 buttonNegative: 'Cancel',
//                 buttonPositive: 'OK',
//             }
//         );
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             // const result = await launchCamera({
//             //     mediaType
//             // })
//             console.log('YO GRANTED');
//         } else {
//             console.log('Camera permission denied');
//         }
//     }catch (err) {
//         console.warn(err);
        
//     }
