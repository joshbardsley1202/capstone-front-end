import React from "react"
import "./Cards.css"
import apis from '../../api'
import Upload from '../Upload/Upload'
import DeleteCard from './DeleteCard/DeleteCard'
export default class Cards extends React.Component {
    constructor(){
        super()
        this.state = {
            memes: [],
            isLoaded: false
        }
        this.getMemes = this.getMemes.bind(this)
    }
    getMemes(){
        this.setState({isLoaded: false})
        fetch(apis.postsDatabaseURl)
          .then(res => res.json())
          .then(resJSON => {
            this.setState({ 
                memes: resJSON.data, 
                isLoaded: true
            });
          })
          .catch(error => console.error(error));
    }
    
    componentDidMount(){
        this.getMemes()
        
        
    }
    render() {
        if(this.state.isLoaded){
            var memes = this.state.memes.map(meme => {
                return <div className="meme">
                    {/* <p>{meme.category}</p> */}
                    <img src={meme.url} />
                    
                    <DeleteCard id={meme.id} getMemes={this.getMemes} />
                  </div>;
            }).reverse()
           
        }else{
            memes=(
                <h1>Loading....</h1>
            )
        }
        return (
            <div>
                <Upload
                    getMemes={this.getMemes}
                />
                {memes}
            </div>
        )
    }
}