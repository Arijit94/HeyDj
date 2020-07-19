import React, { Component } from "react";
import CardTemplate from "../Common/CardTemplate";
import { apiAxios } from "../APIaxios/ApiAxiosCalls";


export default class Genre extends Component {
    constructor(props) {
        super(props);

        this.state = {
            genreItems: []
        }
    }

    componentDidMount(){
        this.getGenres();
    }

    getGenres = () => {
        apiAxios.get(
            "/api/genre"
        )
            .then((res) => {
                this.setState({
                    genreItems: res.data.genres,
                })
            })
            .catch(function (error) {
                alert(error.response);
            });
    }

    onMoreClick = () =>{
        this.props.history.push('/Genres');
    }

    render() {
        return (
            <React.Fragment>
                <div className="row col-md-12 dj-play-list">
                    <div className="p-3 featured-play">
                        <div className="row" style={{ paddingBottom: "10px" }}>
                            Genres
                            {this.state.genreItems.length > 3 ?
                                <a onClick={this.onMoreClick}>More</a> : null}
                        </div>
                        <div className="row">
                            {this.state.genreItems.slice(0,3).map((data) => (
                                <div className="col-md-3 m-3">
                                    <CardTemplate
                                        history={this.props.history}
                                        playlistData={data}
                                        type={"genre"}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}