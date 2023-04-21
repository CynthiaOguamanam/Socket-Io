import React from "react";
import { FaUser } from "react-icons/fa";
import styled from "styled-components";
import axios from "axios";

const Likes = ({ props }) => {
  const getPost = async () => {
    await axios.post(`http://localhost:1133/user/${props._id}/like`);
  };

  return (
    <div>
      <Icon onClick={getPost} />
    </div>
  );
};

export default Likes;

const Icon = styled(FaUser)`
  font-size: 20px;
  color: red;
  margin-left: 30px;
`;
