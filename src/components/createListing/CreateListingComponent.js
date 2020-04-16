import "./CreateListingComponent.css"
import React from "react"
import NavBarComponent from "../NavBarComponent";
import { capitalizeAllFirstLetter } from "../../utils/StringUtils"


class CreateListingComponent extends React.Component {

    state = {
        title : '',
        type: 'SERVICE',
        description: '',
        price: 0,
        imageUrl: '',


        continentList: [],
        regionList: [],
        subregionList: [],
        selectedContinent: '',
        selectedRegion: '',
        selectedSubregion: '',
    }


    postListing = () =>
        console.log(this.state)

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.locations !== this.props.locations) {

            let continentList = this.getContinents();
            let selectedContinent = continentList[0];
            let regionList = this.getRegionsForContinent(selectedContinent);
            let selectedRegion = regionList[0];
            let subregionList = this.getSubregionsForRegion(selectedContinent, selectedRegion);
            let selectedSubregion = subregionList[0][1];

            this.setState(prevState => (
                {
                    ...prevState,
                    'continentList': continentList,
                    'selectedContinent': selectedContinent,
                    'regionList': regionList,
                    'selectedRegion': selectedRegion,
                    'subregionList': subregionList,
                    'selectedSubregion': selectedSubregion
                }
            ))
        }
    }

    updateField(currentKey, newValue) {
        this.setState(prevState => (
            {
                ...prevState,
                [currentKey]: newValue
            }
        ))
    }

    getContinents = () => {
        return Object.keys(this.props.locations);
    }

    getRegionsForContinent = (continent) => {
        return Object.keys(this.props.locations[continent]['regions']);
    }

    getSubregionsForRegion = (continent, region) => {
        return Object.entries(this.props.locations[continent]['regions'][region])
    }

    resetProductFields = () => 
    // Reset all Product-related fields
        this.setState(
            {
                imageUrl: ''
            }
        )

    render() {
        return(
            <div className={`container-fluid`}>
                <NavBarComponent
                    profile = {this.props.profile}
                    logout = {this.props.logout}
                />
                <div class="mt-4">

                    <h2>Create a Listing</h2>
                    <br></br>

                    <h4>Listing General Information</h4>
                    <div class="form-group">
                        <label for="listingTitle">Listing Title</label>
                        <input class="form-control" id="listingTitle" placeholder="Enter a Listing title"
                            onChange={e => this.setState({title: e.target.value})}
                            value={this.state.title}/>
                    </div>

                    <div class="form-group">
                        <label for="listingType">Type of Listing</label>
                        <select class="form-control" id="listingType"
                            onChange={e => {
                                this.setState({type: e.target.value});
                                if (e.target.value === "SERVICE") {
                                    // Reset all PRODUCT fields when switching to SERVICE listing type
                                    this.resetProductFields();
                                }
                                else {
                                    // Reset all SERVICE fields when switching to PRODUCT listing type
                                    //this.resetServiceFields();
                                }
                            }}
                            value={this.state.type}>
                            
                            <option value="SERVICE">Service</option>
                            <option value="PRODUCT">Product</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="listingDescription">Listing Description</label>
                        <textarea class="form-control " id="listingDescription" placeholder="Enter a Listing Description"
                            onChange={e => this.setState({description: e.target.value})}
                            value={this.state.description}/>
                    </div>

                    <div class="form-group">
                        <label for="listingPrice">Listing Price</label>
                        <input type="number" class="form-control" id="listingPrice" placeholder="Enter a Listing Price"
                            onChange={e => this.setState({price: e.target.value})}
                            value={this.state.price}/>
                        <small id="priceHelp" class="form-text text-muted">Example: 42.69</small>

                    </div>

                    <br></br>
                    <h4>Listing Location Information</h4>
                    <div class="form-group row">
                        <div class="form-group col-md-4">
                            <label for="inputContinent" class="col-form-label float-left">Continent</label>
                            <select id="inputContinent" class="form-control"
                                onChange={(e) => {
                                    let selectedContinent = e.target.value;
                                    let regionList = this.getRegionsForContinent(selectedContinent);
                                    let selectedRegion = regionList[0];
                                    let subregionList = this.getSubregionsForRegion(selectedContinent, selectedRegion);
                                    let selectedSubregion = subregionList[0][1];
                        
                                    this.setState(prevState => (
                                        {
                                            ...prevState,
                                            'selectedContinent': selectedContinent,
                                            'regionList': regionList,
                                            'selectedRegion': selectedRegion,
                                            'subregionList': subregionList,
                                            'selectedSubregion': selectedSubregion
                                        }))}}>
                                {this.state.continentList && this.state.continentList.map(continentKey => 
                                    <option key={continentKey} value={continentKey}>{this.props.locations[continentKey]['continentName']}</option>
                                )}
                            </select>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="inputRegion" class="col-form-label float-left">Region</label>
                            <select id="inputRegion" class="form-control" 
                                onChange={(e) => {
                                    let selectedRegion = e.target.value;
                                    let subregionList = this.getSubregionsForRegion(this.state.selectedContinent, selectedRegion);
                                    let selectedSubregion = subregionList[0][1];
                        
                                    this.setState(prevState => (
                                        {
                                            ...prevState,
                                            'selectedRegion': selectedRegion,
                                            'subregionList': subregionList,
                                            'selectedSubregion': selectedSubregion
                                        }))}}>
                                {this.state.regionList && this.state.regionList.map(regionKey => 
                                    <option key={regionKey} value={regionKey}>{regionKey}</option>
                                )}
                            </select>
                        </div>

                        <div class="form-group col-md-4">
                            <label for="inputSubregion" class="col-form-label float-left">Subregion</label>
                            <select id="inputSubregion" class="form-control" 
                                onChange={(e) => {
                                    this.updateField("selectedSubregion", e.target.value)
                                }}
                            >
                                {this.state.subregionList && this.state.subregionList.map(subregionKey => 
                                    <option key={subregionKey[0]} value={subregionKey[1]}>{capitalizeAllFirstLetter(subregionKey[0])}</option>
                                )}
                            </select>                    
                        </div>
                    </div>

                    {this.state.type === 'PRODUCT' &&
                        <div>
                            <br></br>
                            <h4>Product Specific Information</h4>

                            <div class="form-group">
                            <label for="listingDescription">Image URL</label>
                            <input type="url" class="form-control " id="listingDescription" placeholder="Enter an Image Link to add an image to your listing"
                                onChange={e => this.setState({imageUrl: e.target.value})}
                                value={this.state.imageUrl}/>
                            </div>
                        </div>

                    }

                    {/* {this.state.type === 'PRODUCT' &&

                    } */}

                    <button className="btn btn-block btn-success"
                        onClick={(e) => {
                            e.preventDefault();//FIXME: Temporary workaround Prevents refreshing of the page (in order to show alert.)
                            this.postListing();
                        }}>Post Listing</button>
                    <a className="btn btn-block btn-danger" href="/">Cancel</a>
                    
                </div>

            </div>
        )
    }
}

export default CreateListingComponent