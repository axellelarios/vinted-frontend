
// IMPORT PACKAGES
import React, { useState, useMemo, useEffect, useCallback} from "react";
import axios from "axios";
import { Navigate, useNavigate  } from "react-router-dom";
import {useDropzone} from 'react-dropzone'

function Publish ({handleToken, token}) { 

  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("color", color);
      formData.append("picture", picture)
      for (let i = 0; i < picture.length; i++) {
        formData.append("picture", picture[i]);
      }  

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) { 
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log("Je suis dans le catch", error);
    }
  };


  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  };

  const focusedStyle = {
    borderColor: '#007782'
  };
  
  const acceptStyle = {
    borderColor: '#007782'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

  function DropZone(props) {



    const onDrop = useCallback(acceptedFiles => {
      setPicture(acceptedFiles)
    }, [])

    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject
    } = useDropzone({onDrop});
    
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isFocused,
      isDragAccept,
      isDragReject
    ]);

    console.log(picture)

    return (
      <div className="dropzone-wrapper">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
         <p>Drag 'n' drop some files here, or click to select files</p>
         <div className="dropzone-images"> 
            {picture ? picture.map(item => <img key={item.path} src={URL.createObjectURL(item)} alt="produit" />) : <></>}
         </div>
        </div> 
      </div>
    );
  }

  return token ? (
       <main className="publish-article">
          <div className="container">

              <h1>Vends ton article</h1>
              <form
                onSubmit={handleSubmit} 
              >

                <DropZone/>

                
                <label>Titre
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                /></label>
                <label> Desciption
                <textarea
                  rows={6}
                  cols={30}
                  name="description"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                /></label>
                <label>Marque
                <input
                  type="text"
                  name="brand"
                  value={brand}
                  onChange={(event) => {
                    setBrand(event.target.value);
                  }}
                /></label>
                <label>Taille
                <input
                  type="text"
                  name="size"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                /></label>
                <label>Couleur
                <input
                  type="text"
                  name="color"
                  value={color}
                  onChange={(event) => {
                    setColor(event.target.value);
                  }}
                /></label>
                <label>Condition
                <input
                  type="text"
                  name="condition"
                  value={condition}
                  onChange={(event) => {
                    setCondition(event.target.value);
                  }}
                /></label>
                <label>Ville
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                /></label>
                <label>Prix
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                /></label>
                <button type="submit" value="Submit"  className="button button-primary">Ajouter</button> 
              </form>

          </div>
        </main>
    ): 
    <Navigate to="/login" />
  }
  
  export default Publish
  