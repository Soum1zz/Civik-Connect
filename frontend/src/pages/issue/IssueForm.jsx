import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaTimes, FaUpload } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import "../../styles/Issue.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { getAllCategories, issueCreate, issueImgs } from "../../api/issueApi";
import { getToken, isTokenExpired } from "../../authService/authService";
import Loader from "../../components/Loader/Loader";

export default function IssueForm() {
  const [position, setPosition] = useState([22.5726, 88.3639]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const previewUrlsRef = useRef([]);
  const navigate= useNavigate();

    useEffect(() => {
      return () => {
        previewUrlsRef.current.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
      };
    }, []);
      useEffect(() => {
  
          const loadCategories = async () => {
              try {
                  const res = await getAllCategories();
                  console.log(res.data[0]);
                  setCategories(res.data);
              } catch (err) {
                  console.log(err);
              } finally {
                  setCategoriesLoading(false);
              }
          };
  
          loadCategories();
  
      }, []);

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

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const availableSlots = 5 - selectedImages.length;

    if (!imageFiles.length) {
      setImageError("Please choose image files only.");
      event.target.value = "";
      return;
    }

    if (availableSlots <= 0) {
      setImageError("You can upload at most 5 images.");
      event.target.value = "";
      return;
    }

    const nextImages = imageFiles.slice(0, availableSlots).map((file) => {
      const previewUrl = URL.createObjectURL(file);
      previewUrlsRef.current.push(previewUrl);

      return {
        id: `${file.name}-${file.lastModified}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl,
      };
    });

    if (imageFiles.length > availableSlots) {
      setImageError("Only 5 images can be added. Extra images were ignored.");
    } else {
      setImageError("");
    }

    setSelectedImages((currentImages) => [...currentImages, ...nextImages]);
    event.target.value = "";
  };

  const removeImage = (imageId) => {
    setSelectedImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === imageId);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
        previewUrlsRef.current = previewUrlsRef.current.filter(
          (previewUrl) => previewUrl !== imageToRemove.previewUrl
        );
      }

      return currentImages.filter((image) => image.id !== imageId);
    });
    setImageError("");
  };

  const uploadImageToCloud = async (file) => {
    if (file) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "Mercato");
            data.append("cloud_name", "dp5zhfxsl");

            try {
              const res = await fetch(
                "https://api.cloudinary.com/v1_1/dp5zhfxsl/image/upload",
                {
                  method: "POST",
                  body: data,
                },
              );

              const jsonData = await res.json();

              return jsonData.secure_url;

            } catch (e) {
              console.error("Image upload failed", e);
              return null;
            }
          }

          return null;

  };

  const handleIssueSubmit = async (event) => {
    event.preventDefault();
    if(isTokenExpired(getToken()))
    {
      navigate(-1);
      return ;
    }
    setIsSubmitting(true);
    const form = event.currentTarget
        const formData = new FormData(form)
        let issueId
        const payload = {
            title: formData.get('title'),
            description: formData.get('desc'),
            city: formData.get('city') ,
            latitude: position[0],
            longitude: position[1],
            state: formData.get('state'),
            category: formData.get('cat'),

        }
        try{
        const res= await issueCreate(payload);
        issueId= res.data;

        }catch(e){
          console.log(e);
          setIsSubmitting(false);
          return;

        }

    try {

  
        const urls = await Promise.all(
            selectedImages.map(img => uploadImageToCloud(img.file))
        );

        const uploadedUrls = urls.filter(Boolean);
        console.log(uploadedUrls);

        if (uploadedUrls.length > 0) {
          await issueImgs(uploadedUrls, issueId);
        }

    } catch (e) {
        console.log(e);
    } finally {
        setIsSubmitting(false);
    }
    navigate(-1);

    
  };

  return (
    <main className="issue-form-page">
      <section className="issue-form-wrap">
        <form
          className="issue-form"
          onSubmit={handleIssueSubmit}
        >
          <button className="issue-form-back-btn" type="button" onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back
          </button>
          <div className="form-heading">
            <h1>Report a New Issue</h1>
            <p>Provide details about the issue</p>
          </div>

          <label >
            Title
            <input name="title" placeholder="Enter issue title" />
          </label>

          <label >
            Description
            <textarea name="desc" placeholder="Describe the issue in detail" />
          </label>

          <label >
            Category
            {categoriesLoading ? (
              <div className="field-loader"><Loader /></div>
            ) : (
              <select defaultValue="" name="cat">
                <option value="" disabled>
                  Select category
                </option>
                {categories.map((cat)=>
                
                (<option key={cat.id}>{cat.name}</option>)
                )
                }
              </select>
            )}
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


          <label >
            city
            <input
            name="city"
            placeholder="Enter city" />
          </label>

          <label >
            State
            <input
            name="state"
            placeholder="Enter state" />
          </label>

          <div className="issue-form-field">
            Upload Images
            <input
              ref={fileInputRef}
              className="image-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              onChange={handleImageChange}
            />
            <div
              className={`upload-box ${selectedImages.length >= 5 ? "disabled" : ""}`}
              onClick={() => selectedImages.length < 5 && fileInputRef.current?.click()}
              onKeyDown={(event) => {
                if ((event.key === "Enter" || event.key === " ") && selectedImages.length < 5) {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
            >
              <FaUpload />
              <strong>Click to upload</strong>
              <span>PNG, JPG, WEBP. {selectedImages.length}/5 selected</span>
            </div>
            {imageError && <p className="image-error">{imageError}</p>}
            {selectedImages.length > 0 && (
              <div className="image-preview-grid">
                {selectedImages.map((image) => (
                  <div className="image-preview-card" key={image.id}>
                    <img src={image.previewUrl} alt={image.file.name} />
                    <button
                      aria-label={`Remove ${image.file.name}`}
                      className="remove-image-btn"
                      type="button"
                      onClick={() => removeImage(image.id)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : "Submit Issue"}
          </button>
        </form>
      </section>
    </main>
  );
}
