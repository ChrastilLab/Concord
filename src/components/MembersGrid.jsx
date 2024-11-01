import React, {useEffect, useState} from "react";
import { Button } from "@chakra-ui/react";

import {useNavigate} from "react-router-dom";
import { supabase } from "../config/supabase";
import { useSession } from "@supabase/auth-helpers-react";

const membersGrid = [
  {
    name: "Test User 2",
    role: "Designer",
    imageUrl:
      "https://img.freepik.com/free-vector/cute-cool-boy-dabbing-pose-cartoon-vector-icon-illustration-people-fashion-icon-concept-isolated_138676-5680.jpg?t=st=1724332220~exp=1724335820~hmac=bc603da56e53ea1ab04b26d87afa62513c5d0bf94d014f37741598a1370b8564&w=1060",
    url: "https://www.google.com",
  },
  {
    id:"48fd95db-ba9c-4f14-8b68-a89265e0ecff",
    name: "Marie Sharp",
    role: "Developer",
    imageUrl:
      "https://img.freepik.com/free-vector/cute-panda-business-riding-rocket-cartoon-vector-icon-illustration-animal-technology-isolated-flat_138676-12821.jpg?w=1060&t=st=1724332278~exp=1724332878~hmac=ad0290eb51e9257d9bb7d43947e3b65fcbf22c54c344c25238c9938508f7c05c",
    url: "https://www.google.com",
  },
  {
    name: "Marie Sharp",
    role: "Manager",
    imageUrl:
      "https://img.freepik.com/free-vector/cute-panda-pilot-flight-with-plane-cartoon-vector-icon-illustration-animal-transportation-isolated_138676-9971.jpg?w=1060&t=st=1724332319~exp=1724332919~hmac=fd30f4552a7891411a2c98d0b2fe36529629eb384946ce9098f6657d9f45f31f",
    url: "https://www.google.com",
  },
  {
    name: "Marie Sharp",
    role: "Mascot",
    imageUrl:
      "https://img.freepik.com/free-vector/hand-drawn-mushroom-cartoon-illustration_23-2150699042.jpg?w=1060&t=st=1724332349~exp=1724332949~hmac=7e1ecfbbb26ac18ca34b3a0d8236bf8ace241ac3ce638fd98319c02afb7eaa7d",
    url: "https://www.google.com",
  },
  {
    name: "Marie Sharp",
    role: "Designer",
    imageUrl:
      "https://img.freepik.com/free-vector/cute-cool-boy-dabbing-pose-cartoon-vector-icon-illustration-people-fashion-icon-concept-isolated_138676-5680.jpg?t=st=1724332220~exp=1724335820~hmac=bc603da56e53ea1ab04b26d87afa62513c5d0bf94d014f37741598a1370b8564&w=1060",
    url: "https://www.google.com",
  },
  {
    name: "Marie Sharp",
    role: "Developer",
    imageUrl:
      "https://img.freepik.com/free-vector/cute-panda-business-riding-rocket-cartoon-vector-icon-illustration-animal-technology-isolated-flat_138676-12821.jpg?w=1060&t=st=1724332278~exp=1724332878~hmac=ad0290eb51e9257d9bb7d43947e3b65fcbf22c54c344c25238c9938508f7c05c",
    url: "https://www.google.com",
  },
  {
    name: "Marie Sharp",
    role: "Manager",
    imageUrl:
      "https://img.freepik.com/free-vector/cute-panda-pilot-flight-with-plane-cartoon-vector-icon-illustration-animal-transportation-isolated_138676-9971.jpg?w=1060&t=st=1724332319~exp=1724332919~hmac=fd30f4552a7891411a2c98d0b2fe36529629eb384946ce9098f6657d9f45f31f",
    url: "https://www.google.com",
  },
  {
    name: "Marie Sharp",
    role: "Mascot",
    imageUrl:
      "https://img.freepik.com/free-vector/hand-drawn-mushroom-cartoon-illustration_23-2150699042.jpg?w=1060&t=st=1724332349~exp=1724332949~hmac=7e1ecfbbb26ac18ca34b3a0d8236bf8ace241ac3ce638fd98319c02afb7eaa7d",
    url: "https://www.google.com",
  },
];

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    width: "100%",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "40px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "10px",
  },
  name: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  role: {
    fontSize: "14px",
    color: "#666",
  },
  visit: {
    margin: "10px",
  },
}



const MembersGrid = (members) => {
  //
  // members must include  {name, id, role, imageUrl}

  const {session} = useSession();
    const [username, setUsername] = useState(
    localStorage.getItem("username") ? localStorage.getItem("username") : ""
  );
  const [userType, setUserType] = useState(
    localStorage.getItem("usertype") ? localStorage.getItem("usertype") : ""
  );


  // create member state. (useState)
  useEffect(() => {
    console.log(username, userType)
    // get member info from database
    // save member info in member state.
  }, []);
  const navigate = useNavigate();

  // async function getMemberUsername(member) {
  //   if (session) {
  //     const {data: Users, error} = await supabase
  //         .from("Users")
  //         .select("*")
  //         .eq("user_", member.name);
  //   }
  // }

  const handleClick = async (member) => {
    // 1. get user info
    // 2. compare member
    // 3.if not current member --> route new page
    // 4.if yes, check user_type,
    // 5.if admin, route-->personal summary
    // 6.if not, route-->personal summary
    // const user = session.user;
    if (userType === true){
      navigate("/personal-summary")
    }else{
      // @TODO: how to get member's username
      // const targetMember = await getMemberUsername(member);
      // if( targetMember.username === username){
      if (member.name === username){
        navigate("/personal-summary")

      }else{
        navigate(`/bio-summary?username=${member.name}&id=${member.id}`)
      }
    }

    console.log(session)

    // navigate("/bio-summary")
    // const newWindow = window.open(url, "_blank");
    // if (newWindow) newWindow.opener = null;
  };
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Project Members</h1>
      <div style={styles.grid}>
        {membersGrid.map((member, index) => (
        // {members.map((member, index) => (
            // replace dom to component(org card, project card)
          <div key={index} style={styles.card}>
            <img src={member.imageUrl} alt={member.name} style={styles.image} />
            <div style={styles.cardContent}>
              <p style={styles.role}>{member.role}</p>
              <h2 style={styles.name}>{member.name}</h2>
            </div>
            <Button
              style={styles.visit}
              onClick={() => handleClick(member)}
            >
              {" "}
              View Individual Page{" "}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersGrid;
