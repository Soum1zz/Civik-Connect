import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";

import "../../styles/Issue.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function Issue() {
  const [position, setPosition] = useState([22.5726, 88.3639]);
  const [imgUrls, setImgUrls] = useState([])

  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    const { lat, lng } = marker.getLatLng();
    setPosition([lat, lng]);
  };

  const getCurrentPos = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        setPosition([location.coords.latitude, location.coords.longitude]);
      },
      (error) => {
        console.error("Geolocation error:", error.message);
      }
    );
  };

  return (
    <main className="issue-page">
      <section className="issue-form-wrap">
        <form
          className="issue-form"
          onSubmit={(event) => {
            event.preventDefault()
            
        }}
        >
          <div className="form-heading">
            <h1>Report a New Issue</h1>
            <p>Provide details about the issue</p>
          </div>

          <label name="title">
            Title
            <input placeholder="Enter issue title" />
          </label>

          <label name="desc">
            Description
            <textarea placeholder="Describe the issue in detail" />
          </label>

          <label name="cats">
            Category
            <select defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              <option>Animal Welfare</option>
              <option>Cleanliness</option>
              <option>Public Infrastructure</option>
              <option>Water Supply</option>
            </select>
          </label>

          <label>
            Location
            <div className="map-shell">
              <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={position}
                  draggable={true}
                  eventHandlers={{ dragend: handleMarkerDragEnd }}
                />
              </MapContainer>
            </div>
            <div className="my-loc-div" onClick={getCurrentPos} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && getCurrentPos()}>
              <FaLocationCrosshairs /> Use Current location
            </div>
          </label>

          <label>
            Address
            <input placeholder="Enter address" />
          </label>

          <label name="img">
            Upload Images
            <div className="upload-box">
              <FaUpload />
              <strong>Click to upload</strong>
              <span>PNG, JPG up to 10MB</span>
            </div>
          </label>

          <button type="submit">Submit Issue</button>
        </form>
      </section>
    </main>
  );
}
