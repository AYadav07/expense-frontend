import React, { useEffect, useState } from "react";
import styled from "styled-components";
const ProfilePic = styled.div`
  width: 30vw;
  background-color: azure;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;
`;
const Pic = styled.img`
  width: 20vw;
  height: 20vw;
  object-fit: cover;
  margin-left: 2vw;
  margin-top: 3vh;
  border-radius: 15px;
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
  // const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(null);
  console.log(image);

  //   function logFormData(formData) {
  //     for (const pair of formData.entries()) {
  //       console.log(pair[0] + ", " + pair[1]);
  //     }
  //   }
  async function onSubmitImg() {
    try {
      const imageData = new FormData();
      imageData.append("new-image", formData);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFormData(file);
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
          {formData == null && (
            <>
              <label htmlFor="fileInput">X</label>
              <input
                id="fileInput"
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </>
          )}
          <button onClick={onSubmitImg}>S</button>
        </Action>
      </ProfilePic>
    </>
  );
};
