import React, { Component } from 'react';
import './searchResult.css'

class SearchResult extends Component {
    // using this method to call the parent's addFavorites method
    handleAddToFavorites = (item) => {
        this.props.addFavorite(item);
    }

    // using this method to call the parent's removeFavorite method
    handleRemoveFromFavorites = (item) => {
        this.props.removeFavorite(item);
    }

    render() {
        return (  
            <div className='results'>
                <table className='container'> 
                    {this.props.results.map((item, index) => (
                        <tbody key={index}>
                            <tr>
                                <td>
                                    {/* SVG to create a star */}
                                    <svg height='20' width='20' className='starIcon' 
                                        fill={this.props.favoritesTitles.includes(item.title) ? 'green' : 'gray'} 
                                        onClick={!this.props.favoritesTitles.includes(item.title) ? () => this.handleAddToFavorites(item) : () => this.handleRemoveFromFavorites(item)}>
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
}

export default SearchResult;
