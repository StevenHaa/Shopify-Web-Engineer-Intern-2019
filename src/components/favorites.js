import React, { Component } from 'react';
import './favorites.css'

class Favorites extends Component {
     // using this method to call the parent's removeFavorite method
     handleRemoveFromFavorites = (item) => {
        this.props.removeFavorite(item);
    }

    render() {
        // only render the area if there is at least 1 favorite
        if(this.props.favorites.length > 0 ){
            return ( 
                <div className='favorites'>
                    <div className='favoritesTitle'>Favorites</div>
                    <table className='container'> 
                        {this.props.favorites.map((item, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>
                                        <svg height='20' width='20' className='starIcon' fill='gray' onClick={() => this.handleRemoveFromFavorites(item)}>
                                            <polygon points='9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78'/>
                                        </svg>
                                     </td>
                                    <td className='title'> {item.title} </td>
                                    <td className='description' dangerouslySetInnerHTML={{__html: item.description}}></td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            )
        }
        else {
            return (<div></div>)
        }   
    }
}

export default Favorites;