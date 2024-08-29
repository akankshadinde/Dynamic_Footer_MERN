import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faPatreon,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faTwitch,
  faPinterest,
  faQuora,
  faSnapchat,
  faWhatsapp,
  faTelegram,
  faReddit,
  faTiktok,
  faGithub,
  faTumblr,
  faThreads,
} from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [texts, setTexts] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dataList, setDataList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const socialMediaIcons = {
    Facebook: { icon: faFacebook, url: "https://www.facebook.com" },
    Twitter: { icon: faTwitter, url: "https://www.twitter.com" },
    Instagram: { icon: faInstagram, url: "https://www.instagram.com" },
    LinkedIn: { icon: faLinkedin, url: "https://www.linkedin.com" },
    YouTube: { icon: faYoutube, url: "https://www.youtube.com" },
    Pinterest: { icon: faPinterest, url: "https://www.pinterest.com" },
    Snapchat: { icon: faSnapchat, url: "https://www.snapchat.com" },
    WhatsApp: { icon: faWhatsapp, url: "https://www.whatsapp.com" },
    Telegram: { icon: faTelegram, url: "https://www.telegram.org" },
    Reddit: { icon: faReddit, url: "https://www.reddit.com" },
    TikTok: { icon: faTiktok, url: "https://www.tiktok.com" },
    GitHub: { icon: faGithub, url: "https://www.github.com" },
    Quora: { icon: faQuora, url: "https://www.quora.com" },
    Twitch: { icon: faTwitch, url: "https://www.twitch.tv" },
    X: { icon: faXTwitter, url: "https://www.twitter.com" },
    Patreon: { icon: faPatreon, url: "https://www.patreon.com" },
    Tumblr: { icon: faTumblr, url: "https://www.tumblr.com" },
    Threads: { icon: faThreads, url: "https://www.threads.net" },
  };

  const fetchInitialData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/footer");
      console.log("Fetched data:", response.data);
      setDataList(response.data);
      const initialTexts = response.data.flatMap((item) => item.texts || []);
      console.log("Initial texts:", initialTexts);
      setTexts(initialTexts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    console.log("Texts state:", texts);
  }, [texts]);

  useEffect(() => {
    fetchInitialData();
    const isFormSubmitted = localStorage.getItem("isFormSubmitted");
    if (isFormSubmitted) {
      setIsFormDisabled(true);
    } else {
      setIsFormDisabled(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormDisabled) {
      alert("You have already submitted the form.");
      return;
    }
    const existingEntry = dataList.find(
      (item) =>
        item.phoneNumber === phoneNumber &&
        item.email === email &&
        item.address === address &&
        JSON.stringify(item.icons) === JSON.stringify(selectedIcons) &&
        JSON.stringify(item.texts) === JSON.stringify(texts)
    );

    if (existingEntry) {
      alert("This record already exists.");
      return;
    }

    try {
      const newData = {
        icons: selectedIcons,
        texts,
        phoneNumber,
        email,
        address,
      };

      if (editId) {
        const response = await axios.put(
          `http://localhost:3001/footer/${editId}`,
          newData
        );
        console.log("edited data: ", response.data);
        setDataList(
          dataList.map((item) => (item._id === editId ? response.data : item))
        );
        setEditId(null);
      } else {
        const response = await axios.post(
          "http://localhost:3001/footer",
          newData
        );
        console.log("data:", response.data);
        setDataList([...dataList, response.data]);
        localStorage.setItem("isFormSubmitted", "true");
        setIsFormDisabled(true);
      }

      // Reset form
      setSelectedIcons([]);
      setTexts([]);
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setSelectedIcons(item.icons || []);
    setTexts(item.texts || []);
    setPhoneNumber(item.phoneNumber || "");
    setEmail(item.email || "");
    setAddress(item.address || "");
    setIsFormDisabled(false); // Form allow for submit again after click on edit
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/footer/${id}`);
      const updatedDataList = dataList.filter((item) => item._id !== id);
      setDataList(updatedDataList);

      if (updatedDataList.length === 0) {
        localStorage.removeItem("isFormSubmitted");
        setIsFormDisabled(false);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleTextChange = (index, value) => {
    if (texts.length <= 16) { // Ensure the limit of 16 texts
      const newTexts = [...texts];
      newTexts[index] = value;
      setTexts(newTexts);
    }
  };

  const handleAddText = () => {
    if (texts.length < 16) { // Add text only if less than 16 entries
      setTexts([...texts, ""]);
    }
  };

  const handleRemoveText = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
  };

  const handleDeleteIcon = (iconToRemove) => {
    setSelectedIcons((prevIcons) =>
      prevIcons.filter((icon) => icon !== iconToRemove)
    );
  };

  const half = Math.ceil(texts.length / 2); // Make Half
  const companyInfoTexts = texts.slice(0, half); // O, half except half
  const moreFromRubixTexts = texts.slice(half); // half,  last

  return (
    <div
      className="container"
      style={{
        position: "absolute",
        top: "0",
        right: "-140px",
        marginTop: "20px",
      }}
    >
      <h1>{editId ? "Edit Details" : "Add Details"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Social Media Icons:</label>
          <select
            className="form-control"
            style={{ width: "50%" }}
            value=""
            onChange={(e) => {
              const icon = e.target.value;
              if (icon && !selectedIcons.includes(icon)) {
                setSelectedIcons([...selectedIcons, icon]);
              }
            }}
            disabled={isSubmitted}
          >
            <option value="">Select an icon</option>
            {Object.keys(socialMediaIcons).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="selected-icons" style={{ marginTop: "10px" }}>
          <label>Selected Icons:</label>
          <div>
            {selectedIcons.map((iconName, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
               < ol> 
                  <FontAwesomeIcon
                  icon={socialMediaIcons[iconName]?.icon}
                  style={{ marginRight: "10px" }} 
                />
               </ol>
                  <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteIcon(iconName)} color="red" />
              </div>
            ))}
          </div>
        </div>

        {/* Text inputs */}
        <div className="form-group">
          <label>Text:</label>
          {texts.map((text, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type="text"
                className="form-control"
                style={{ width: "50%" }}
                value={text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                placeholder="Enter text"
              />
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveText(index)}
                  style={{ marginLeft: "5px" }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleAddText}
            style={{ marginTop: "5px" }}
          >
            Add More
          </button>
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="number"
            className="form-control"
            style={{ width: "50%" }}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            disabled={isSubmitted}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            style={{ width: "50%" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            disabled={isSubmitted}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            className="form-control"
            style={{ width: "50%" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            disabled={isSubmitted}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginTop: "10px" }}
          disabled={isSubmitted}
        >
          Submit
        </button>
      </form>

      <div className="table-container" style={{ marginTop: "30px" }}>
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th>Icons</th>
              <th>Text</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.icons.map((iconName, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={socialMediaIcons[iconName]?.icon}
                      style={{ marginRight: "10px" }}
                    />
                  ))}
                </td>
                <td>
                  {item.texts.map((text, index) => (
                    <div key={index}>
                      <ul> {text} </ul>
                     </div>
                  ))}
                </td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                    <FontAwesomeIcon color="blue" icon={faEdit} onClick={() => handleEdit(item)} />
                    <FontAwesomeIcon icon={faTrash} color="red" onClick={() => handleDelete(item._id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <footer className="FooterContainer">
        <div className="FooterRow">
          <h5>Logo</h5>
          <div className="SocialMediaIcons">
            {dataList.map(
              (item) =>
                item.icons &&
                item.icons.map((iconName) => (
                  <Link
                    key={iconName}
                    to={socialMediaIcons[iconName]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#999999",
                      textDecoration: "none",
                      marginRight: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon={socialMediaIcons[iconName]?.icon} />
                  </Link>
                ))
            )}
          </div>
        </div>

        <div className="FooterRow">
          <h5>Company Information</h5>
          <div className="FooterText">
            {companyInfoTexts.length ? (
              companyInfoTexts.map((text, index) => (
                <Link
                  key={index}
                  to={`/company-information/${encodeURIComponent(text)}`}
                  style={{ color: "#999999", textDecoration: "none" }}
                >
                  <p>{text}</p>
                </Link>
              ))
            ) : (
              <p>No information available</p>
            )}
          </div>
        </div>

        <div className="FooterRow">
          <h5>More From Rubix</h5>
          <div className="FooterText">
            {moreFromRubixTexts.length ? (
              moreFromRubixTexts.map((text, index) => (
                <Link
                  key={index}
                  to={`/more-from-rubix/${encodeURIComponent(text)}`}
                  style={{ color: "#999999", textDecoration: "none" }}
                >
                  <p>{text}</p>
                </Link>
              ))
            ) : (
              <p>No information available</p>
            )}
          </div>
        </div>

        <div className="FooterRow">
          <h5>Let's Talk</h5>
          <div className="FooterText">
            {dataList.map((item) => (
              <div key={item._id}>
                <FontAwesomeIcon icon={faPhone} />{" "}
                <span>{item.phoneNumber}</span>
                <br />
                <FontAwesomeIcon icon={faEnvelope} /> <span>{item.email}</span>
                <br />
              </div>
            ))}
          </div>
          <h5>Find us</h5>
          <div className="FooterText">
            {dataList.map((item) => (
              <div key={item._id}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
                <span>{item.address}</span>
                <br />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
