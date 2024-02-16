/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/atom/userAtom";

const ProfilePic = styled.div`
  width: 30vw;
  background-color: azure;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;

  @media (max-width: 480px) {
    align-items: center;
    width: 80vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Pic = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
  margin-left: 2vw;
  margin-top: 3vh;
  border-radius: 15px;

  @media (max-width: 480px) {
    width: 70vw;
    height: 70vw;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11vw;
  margin-right: 8vw;
  color: black;
`;
export const ProfileImage = () => {
  const imgsrc = `${process.env.REACT_APP_API_URL}/get-profile-pic/`;
  const [user, setUser] = useRecoilState(userAtom);
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(imgsrc + user.profile_pic);
  const [formData, setFormData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  //   function logFormData(formData) {
  //     for (const pair of formData.entries()) {
  //       console.log(pair[0] + ", " + pair[1]);
  //     }
  //   }
  async function onSubmitImg() {
    try {
      console.log(formData);
      const resData = await axios.post(
        `${apiUrl}/api/upload/profile-pic`,
        formData,
        { withCredentials: true }
      );
      if (resData.data) {
        setUser(resData.data);
        setEdit(false);
      }
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      let imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      const fileName = Date.now() + file.name;
      const imageData = new FormData();
      imageData.append("name", fileName);
      imageData.append("profile-pic", file);
      setFormData(imageData);
      setEdit((e) => !e);
    }

    // const formData = new FormData();
    // console.log(e.target.files);
    // formData.append("xyz", e.target.files[0]);
    // logFormData(formData);
    // setImage(formData);
    // console.log(image);
  }

  useEffect(() => {
    console.log("in effect");
    console.log(image);
  }, [image]);

  return (
    <>
      <ProfilePic>
        <Pic src={image} />

        <Action>
          {
            <>
              {!edit ? (
                <label htmlFor="fileInput">
                  <EditOutlinedIcon />{" "}
                </label>
              ) : (
                <div>
                  <CloseOutlinedIcon
                    onClick={() => {
                      setEdit(false);
                      setImage(imgsrc + user.profile_pic);
                      setFormData(null);
                    }}
                  />
                </div>
              )}

              <input
                id="fileInput"
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </>
          }
          {edit && (
            <button onClick={onSubmitImg}>
              <SaveIcon style={{ border: "none", background: "transparent" }} />
            </button>
          )}
        </Action>
      </ProfilePic>
    </>
  );
};
