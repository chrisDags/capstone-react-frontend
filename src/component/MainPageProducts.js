import React, { useEffect, useState, Redirect } from "react";
import "./Box.css";
import { Card } from "react-bootstrap";
import ApiService from "./ApiService.jsx";
import { useHistory } from "react-router";
import SearchField from "react-search-field";
import { Form } from "react-bootstrap";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const MainPageProducts = () => {
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [hasSearchBeenClicked, setHasSearchBeenClicked] = React.useState(false)
  const [hasAddBeenClicked, setHasAddBeenClicked] = React.useState(false)
  const [addItemMessage, setAddItemMessage] = React.useState("")  

  const history = useHistory();

  useEffect(() => {
    ApiService.getAllTasks().then((response) => {
      setAlbums(response.data);
    }).catch();

  }, []);


  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const refresh = () =>{
    ApiService.getAllTasks().then((response) => {
      setAlbums(response.data);
      setHasSearchBeenClicked(false)
    }).catch();
  }

  const onSearchClcked = (e) => {
    if (e === "" || e === null) {
      refresh()
    }

    setHasSearchBeenClicked(true)

    ApiService.getAlbumByName(e)
      .then((response) => {
        setAlbums(response.data);
      })
      .catch(() => {});
  };

  const onAddClicked = (title, cardCount) => {
    let error = false;

    if(cardCount === undefined){
      cardCount = 1;
    }

    setHasAddBeenClicked(true)

    setAddItemMessage(title)

    ApiService.createNewAlbumInCart(title, cardCount)
      .then((response) => {})
      .catch(() => {
        error = true;
        history.push("/login");
      });

    if (error) {
      refresh()
      return <Redirect to="/login" />;
    }
  };

  const renderCard = (card, index) => {

    var imageToShow = "";
    var cardCount;
  

    if (card.format === "CD") {
      imageToShow = "./cd-image.jpg";
    } else {
      imageToShow = "./cover-art.jpg";
    }

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card key={index} className="box" style={{backgroundColor: "lightGray"}}>
          {/* <h1>{albums.map(album => album.id)}</h1> */}
          <Card.Img
            variant="top"
            style={{ width: "550px", height: "245px" }}
            src="holder.js/100px180"
            src={`${imageToShow}`}
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "35px" }}>{card.title}</Card.Title>
            <Card.Text>{card.artist}</Card.Text>
            <Card.Text>${card.price}</Card.Text>
            {/* <Card.Text>{card.songs.map((song) => <text>{song.songName}</text>)}</Card.Text> */}
            <Form className="form-select form-select-sm" >
                <select onChange={e => cardCount = e.target.value} id = "dropdown" value={cardCount}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>              
                </select>
            </Form>

            <div style={{ paddingBottom: "5px" }}>
              <button
                className="btn btn-success"
                onClick={() => onAddClicked(card.title, cardCount)}
              >
                Add to Cart
              </button>
            </div>
            <div>{}</div>
            <button
              className="btn btn-primary"
              onClick={() =>
                history.push({
                  pathname: "/details",
                  state: {
                    title: card.title,
                    artist: card.artist,
                    price: card.price,
                    description: card.description,
                  },
                })
              }
            >
              See Details
            </button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
   
    
    <div style={{ paddingTop: "85px"}}>
        {hasAddBeenClicked && <h1><div className="alert alert-success">{addItemMessage +" added to cart!"}</div></h1>}
      <h1>Search for Album</h1>
      <SearchField
        color='black'
        placeholder="Search..."
        onChange={onChangeSearch}
        onSearchClick={onSearchClcked}
        searchText=""
        classNames="test-class"
      />
 
      <div className="grid" style={{ justifyContent: "center" }}>
       
        {albums.map(renderCard)}
      </div>
      {hasSearchBeenClicked && <div><button className="btn btn-success" onClick={() => refresh()}>Back To Main Page</button></div>}
    </div>
  );
};

export default MainPageProducts;
