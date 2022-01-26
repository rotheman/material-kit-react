import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useAppContext } from "../../lib/contextLib";
import imageService from "../../_services/image.service";

//sample user avatar
const user = {
  defaultimage: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
};

function AccountProfile() {
  const { currentUser, setCurrentUser } = useAppContext();
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);

  const [imageData, setImageData] = useState(null);
  const [imageName, setImageName] = useState("");

  //Some links on Picture setting:
  //https://www.w3docs.com/snippets/html/how-to-display-base64-images-in-html.html
  //https://stackoverflow.com/questions/42395034/how-to-display-binary-data-as-image-in-react

  const imageSelectedHandler = (e) => {
    let file = e.target.files[0];
    let imageData = new FormData();
    imageData.append("image", file);
    setImageData(imageData);
    setImagePreview(URL.createObjectURL(file));
    setFile(file);
    console.log("this is the image data:")
    console.log(imageData);
    // setImageData(e.target.files[0]);
  };
  const fielUploadHandler = () => {
    imageService.upload(imageData);
    // currentUser.avatar = imageService.getCurrentAvatar();
    // setCurrentUser(currentUser);

    let idCardBase64 = "";
    getBase64(file, (result) => {
      idCardBase64 = result;
    });
    // console.log("new")
    // console.log(idCardBase64)
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        // cb(reader.result),
        console.log(reader.result.substring(22));
        console.log("success")
        currentUser.avatar = reader.result.substring(22)
        setCurrentUser(currentUser);

    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

  // useEffect(() => {
  //   if(imageData!==null){
  //     currentUser.avatar=imagePreview}
  //     setCurrentUser(currentUser)
  //     console.log(currentUser)

  // }, [imagePreview]);

  //   useEffect(() => {

  //     axios.get(SERVER_URL + "update/getCurrentAvatar" + user.id + "/avatar", imageData, {
  //       headers: {Authorization: "Bearer " + user.planBarToken,
  //       "Content-type": "multipart/form-data",
  //       'Accept': 'application/json'}

  //     currentUser.avatar=imagePreview}
  //     setCurrentUser(currentUser)
  //     console.log(currentUser)

  // }, []);

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={`data:image/jpeg;base64,${currentUser.avatar}`}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {currentUser.username}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {currentUser.roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <div>
          {" "}
          <input type="file" onChange={imageSelectedHandler} />
        </div>
      </CardActions>
      <CardMedia
        component="img"
        image={imagePreview !== null ? imagePreview : null}
      />
      <Button
        color="primary"
        fullWidth
        variant="text"
        onClick={fielUploadHandler}
      >
        Auswahl speichern
      </Button>
    </Card>
  );
}
export default memo(AccountProfile);
