import React from 'react'
import Search from 'antd/lib/input/Search'
import './SearchComponent.scss'

export default function SearchComponent({placeHolder, onSearch}) {
  return (
    <Search placeholder={placeHolder} onSearch={onSearch} className='search-input'/>
  )
}
