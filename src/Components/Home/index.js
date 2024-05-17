import React, { Component } from "react";
import { Audio } from "react-loader-spinner";
import ImageItem from '../ImageItem';
import OptionItem from '../OptionItem';
import logo from "../Images/logo.jpeg";
import search from "../Images/search.svg";
import "./style.css";

const optionsList = [
  { id: "mou", name: "mountain", display_text: "Mountain" },
  { id: "flo", name: "flowers", display_text: "Flowers" },
  { id: "bea", name: "beaches", display_text: "Beaches" },
  { id: "cit", name: "cities", display_text: "Cities" },
];

const statusCode = {
  loading: "loading",
  success: "success",
  failure: "failure",
};

export default class Index extends Component {
  state = {
    searchText: "",
    pageStatus: statusCode.loading,
    activeOptionId: optionsList[0].id,
    imageSearch: optionsList[0].name,
    imagesList: [],
    page:1
  };

  componentDidMount() {
    this.getResults();
  }

  getResults = async () => {
    this.setState({ pageStatus: statusCode.loading });
    const { imageSearch ,page} = this.state;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${imageSearch}`;
    const accessToken = "Client-ID _thqExQsq6RjuK8rQMdGtRC85uR-y00O1aMeWG23IbA";

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        this.setState({ pageStatus: statusCode.failure });
        return;
      }

      const data = await response.json();
      this.setState({ imagesList: data.results, pageStatus: statusCode.success });
    } catch (error) {
      this.setState({ pageStatus: statusCode.failure });
    }
  };

  onSearch = (event) => {
    this.setState({ searchText: event.target.value });
  };

  onClickSearch = () => {
    const { searchText } = this.state;
    this.setState({ imageSearch: searchText, activeOptionId:'' }, this.getResults);
  };

  onTabChange = (id) => {
    const tabData = optionsList.find((obj) => obj.id === id);
    this.setState({ activeOptionId: id, imageSearch: tabData.name, searchText:'' }, this.getResults);
  };

  renderLoadingView = () => (
    <div className="loader-container">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#FFCC00"
        ariaLabel="loading"
      />
    </div>
  );

  renderSuccessView = () => {
    const { imagesList } = this.state;
    return (
      <ul className="results-list">
        {imagesList.map((obj) => (
          <ImageItem key={obj.id} obj={obj} />
        ))}
      </ul>
    );
  };

  renderFailureView = () => (
    <div className="up-loader-container failure-view">
      <img
        height="80%"
        alt="failure view"
        src="https://res.cloudinary.com/lalitendra/image/upload/v1702833753/Group_7522_rf182w.png"
      />
      <p>Something went wrong. Please try again</p>
      <button onClick={this.getResults} type="button" className="lg-btn">
        Try again
      </button>
    </div>
  );

  renderPage = () => {
    const { pageStatus } = this.state;

    switch (pageStatus) {
      case statusCode.loading:
        return this.renderLoadingView();
      case statusCode.success:
        return this.renderSuccessView();
      case statusCode.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  onPrev=()=>{
    const {page}=this.state
    if(page >= 2){
        this.setState(prevState=>({page:prevState.page-1}),this.getResults)
    }

  }

  onNext=()=>{
    
    this.setState(prevState=>({page:prevState.page+1}),this.getResults)
    

  }

  render() {
    const { searchText, activeOptionId,imageSearch, page } = this.state;
    return (
      <div className="home">
        <img alt="webs-logo" src={logo} />

        <div className="search-card">
          <input
            type="search"
            placeholder="Search for images"
            value={searchText}
            onChange={this.onSearch}
          />
          <button onClick={this.onClickSearch}>
            <img alt="search-logo" src={search} />
          </button>
        </div>

        <ul className="options-list">
          {optionsList.map((obj) => (
            <OptionItem
              key={obj.id}
              obj={obj}
              onTabChange={this.onTabChange}
              activeOptionId={activeOptionId}
            />
          ))}
        </ul>

        {searchText===imageSearch && (<div className="search-content">

            <h3>{searchText}</h3>
            

        </div>)}

        <hr/>

        {this.renderPage()}

        <div className="pagination">
            <button className="prev" onClick={this.onPrev}>Prev</button>
            <div>Page: {page}</div>
            <button className="next" onClick={this.onNext}>Next</button>
        </div>

      </div>
    );
  }
}
