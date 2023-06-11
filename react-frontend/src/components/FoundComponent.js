import React, { useEffect, useState } from "react";
import FoundService from "../services/FoundService";
import MyNavbar from "./MyNavBar";
import CreateFoundItem from "./CreateFounditem";
import More from "../images/more.png";
import { Modal, Button } from "react-bootstrap";

const FoundComponent = () => {
  const [founds, setFounds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false); // 新增状态

  useEffect(() => {
    setIsAnimated(true); // 设置动画状态为true，使元素滑入
    fetchFoundItems();
  }, []);

  const fetchFoundItems = () => {
    FoundService.getFounds()
      .then((data) => {
        setFounds(data);
      })
      .catch((error) => {
        console.error("Error fetching found items:", error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.trim() === "") {
      fetchFoundItems(); // Fetch all items when search bar is empty
    } else {
      FoundService.searchFoundItems(event.target.value.trim())
        .then((data) => {
          setFounds(data);
        })
        .catch((error) => {
          console.error("Error searching found items:", error);
        });
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      minHeight: "100vh", // Changed height to minHeight
      backgroundColor: "#FFFFF0",
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: "20px",
    },
    card: {
      width: "25rem",
      height: "30rem",
      margin: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cardImage: {
      height: "60%",
      objectFit: "contain",
    },
    cardBody: {
      padding: "10px",
      height: "40%",
    },
    heading: {
      fontFamily: "'Lalezar', cursive",
      fontSize: "64px",
      color: "#333",
      marginTop: "20px",
      marginBottom: "10px",
    },
    searchBarContainer: {
      position: "relative", // 新增
      display: "flex",
      alignItems: "center",
    },
    searchInput: {
      borderRadius: "30px",
      padding: "10px",
      width: "700px",
      height: "50px",
      marginRight: "10px",
      border: "solid",
      position: "relative", // 新增
      borderWidth: "2px",
      zIndex: 1, // 新增
    },
    moreButton: {
      cursor: "pointer",
      width: "115px",
      height: "55px",
      marginLeft: "30px",
      marginRight: "20px",
    },
    searchIndicator: {
      position: "absolute",
      bottom: "calc(100% - 60px)", // 調整底部位置，具體數值根據你的需求調整
      right: "225px", // 調整右側位置，具體數值根據你的需求調整
      width: "700px",
      height: "50px",
      backgroundColor: "#D4BBFF",
      borderRadius: "30px",
      border: "solid",
      borderWidth: "2px",
      zIndex: 0,
    },
    animateContainer: {
      opacity: 0, // 默认隐藏元素
      transform: "translateY(100px)", // 初始位置在下方
      transition: "opacity 1s, transform 1s", // 过渡动画效果
    },

    animateContainerVisible: {
      opacity: 1, // 显示元素
      transform: "translateY(0)", // 移动到初始位置
    },
  };

  return (
    <div>
      <MyNavbar />
      <div
        style={{
          ...styles.animateContainer,
          ...(isAnimated && styles.animateContainerVisible),
        }}
      >
        <div style={styles.container}>
          <h1 style={styles.heading}>Found List</h1>

          <div style={styles.searchBarContainer}>
            <input
              type="text"
              style={styles.searchInput}
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div style={styles.searchIndicator}></div>

            <img
              src={More}
              alt="More"
              style={styles.moreButton}
              onClick={handleShowModal}
            />

            <CreateFoundItem />
          </div>

          <div style={styles.cardContainer}>
            {founds.map((found) => (
              <div key={found.iid} className="card" style={styles.card}>
                {found.photo && (
                  <img
                    src={found.photo}
                    className="card-img-top"
                    alt={found.name}
                    style={styles.cardImage}
                  />
                )}
                <div className="card-body text-center" style={styles.cardBody}>
                  <h5
                    className="card-title"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    {found.name}
                  </h5>
                  <p
                    className="card-text"
                    style={{ fontFamily: "Microsoft YaHei" }}
                  >
                    {found.type}
                    <br />
                    {found.lastSeenPlace.name} {found.lastSeenPlace.floor}{" "}
                    {found.lastSeenPlace.classroom}
                    <br />
                    {found.lastSeenTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            dialogClassName="modal-dialog-centered modal-lg"
          >
            <Modal.Body
              style={{
                backgroundColor: "#FFFFF0",
                borderRadius: "40px",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="secondary"
                  onClick={handleCloseModal}
                  style={{
                    borderRadius: "40px",
                    borderWidth: "4px",
                    borderColor: "black",
                    width: "450px",
                    height: "100px",
                    marginBottom: "50px",
                    fontFamily: "'Lalezar', cursive",
                    fontSize: "50px",
                    color: "black",
                    backgroundColor: "#FFA800",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform =
                      "translateY(10px) translateX(10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "none";
                  }}
                >
                  LOCATIONS
                </Button>
                <Button
                  variant="primary"
                  style={{
                    borderRadius: "40px",
                    borderWidth: "4px",
                    borderColor: "black",
                    width: "450px",
                    height: "100px",
                    fontFamily: "'Lalezar', cursive",
                    fontSize: "50px",
                    color: "black",
                    backgroundColor: "#80D1FF",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "10px 10px 0px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform =
                      "translateY(10px) translateX(10px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "none";
                  }}
                >
                  CATEGORIES
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default FoundComponent;
