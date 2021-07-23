# PeerTransfer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can check available scripts and from the [official documents here](https://create-react-app.dev/docs/getting-started).

## About

The motivation behind this project is for me to effortlessly transfer files and share between my devices without login into any other third-party service.

PeerTransfer is inspired by [Firebase + WebRTC Codelab](https://webrtc.org/getting-started/overview) video chat application guide. This app uses [WebRTC](https://webrtc.org/) for secure end-to-end peer connection, together with free STUN server from Google, and Firebase for signalling service and peer presence management.

PeerTransfer is built with the following front-end technologies:

- React + TypeScript
- Material-UI
- Styled-components
- React-dropzone
- React-use-gesture

Modern browser is recommended for best WebRTC support (https://caniuse.com/rtcpeerconnection), and PeerTransfer App settings are stored in the browser's localStorage. I limited the file size and numbers for my daily uses. You can replace the Firebase config in the .env file and check the firestore data structure on your own firebase console.

For Firebase, only the following data is used for signalling:

- File metadata including file name, size and type,
- ICE candidate descriptions, offers and answers that contain SDP information.

Your public IP address is also used and served as the default room ID (in base64 encoded format). You can also join another network room by entering their ID, or create custom ones from your own.

All the above info will be removed from Firebase once a peer session is closed.
