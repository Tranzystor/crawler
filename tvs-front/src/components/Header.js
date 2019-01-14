import React from 'react';
import moment from 'moment';

const displayDate = date => {
    return moment(date).format('D-MMM-YY')
  }

const Header = ({tv}) => {
    const cardTitle = `${tv.model} ${tv.diagonal} [cal] lowest: ${tv.lowestPrice} (${displayDate(tv.lowestPriceDate)}) current: ${tv.newestPrice}(${displayDate(tv.newestDate)})`;
    return (
        <div>{cardTitle}</div>
    )
}

export default Header;