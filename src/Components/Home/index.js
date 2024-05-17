import React, { Component } from "react";
import ImageItem from '../ImageItem'
import OptionItem from '../OptionItem'
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

export default class index extends Component {
  state = {
    searchText: "",
    pageStatus: statusCode.loading,
    activeOptionId: optionsList[0].id,
    imageSearch: optionsList[0].name,
    imagesList:[]
  };

  componentDidMount() {
    this.getResults();
  }

  getResults = async () => {
    const {imageSearch}=this.state
    const url = `https://api.unsplash.com/search/photos?page=1&query=${imageSearch}`;
    const accessToken = "Client-ID _thqExQsq6RjuK8rQMdGtRC85uR-y00O1aMeWG23IbA";

    const response = await fetch(url, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (!response.ok) {
        this.setState({pageStatus:statusCode.failure})
    }

    const data = await response.json();

    
    this.setState({imagesList:data.results, pageStatus:statusCode.success})

  };

  onSearch = (event) => {
    this.setState({ searchText: event.target.value });
  }; 

  onClickSearch=()=>{
    const {searchText}=this.state
    this.setState({pageStatus:statusCode.loading,imageSearch:searchText},this.getResults)
  }

  onTabChange=(id)=>{
    const tabData=optionsList.find(obj=>(obj.id===id))
    this.setState({activeOptionId:id, imageSearch:tabData.name,pageStatus:statusCode.loading}, this.getResults)
    console.log(tabData.id)
  }

  render() {
    const { searchText,imagesList , activeOptionId} = this.state;
    console.log(imagesList)
    return (
      <div className="home">
        <img alt="webs-logo" src={logo} />

        <div className="search-card">
          <input type="search" placeholder="Search for images" value={searchText} onChange={this.onSearch} />
          <button onClick={this.onClickSearch}>
            <img alt="search-logo" src={search}  />
          </button>
        </div>

        <ul className="options-list">
            {optionsList.map(obj=>(<OptionItem key={obj.id} obj={obj} onTabChange={this.onTabChange} activeOptionId={activeOptionId}  />))}

        </ul>

        <ul className="results-list">
                {imagesList.map(obj=>(<ImageItem key={obj.id} obj={obj} />))}
        </ul>

      </div>
    );
  }
}
