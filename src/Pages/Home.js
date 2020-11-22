import React, { useState, useContext } from "react";
import Axios from "axios";
import {
  Row,
  Container,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import UserCard from "../Components/UserCard";
import Repos from "../Components/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { toast } from "react-toastify";

const Home = () => {
  const context = useContext(UserContext);

  const [fetchUser, setFetchUser] = useState("");
  const [userCard, setUserCard] = useState(null);

  const fetchGit = async () => {
    try {
      const { data } = await Axios.get(
        `https://api.github.com/users/${fetchUser}`
      );
      setUserCard(data);
    } catch (error) {
      toast("Not able to locate User", { type: "error" });
    }
  };
  if (!context.user?.uid) {
    return <Redirect to="/signin" />;
  }
  return (
    <Container className="mb-3">
      <Row className="mt-3">
        <Col md="5">
          <InputGroup>
            <Input
              type="text"
              value={fetchUser}
              name="fetchUser"
              id="fetchUser"
              onChange={(e) => setFetchUser(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button color="success" onClick={fetchGit}>
                Fetch User
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {userCard ? (
            <div>
              <UserCard user={userCard} />
            </div>
          ) : null}
        </Col>
        <Col md="7">
          {userCard ? <Repos repos_url={userCard.repos_url} /> : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
