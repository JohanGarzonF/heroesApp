import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'

import { useForm } from '../../hooks/useForm'
import { HeroCard } from '../../heroes/components'
import { getHeroesByName } from '../helpers'

export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { q = '' } = queryString.parse( location.search )
  const heroes = getHeroesByName( q )
  
  const showSearch = q.length === 0
  const showError = q.length > 0 && heroes.length === 0

  const { searchText, onInputChange } = useForm({
    searchText: q
  })

  const onSearchSubmit = ( e ) => {
    e.preventDefault()

    if ( searchText.trim().length <= 1 ) return

    navigate(`?q=${ searchText }`)
  }



  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={ onSearchSubmit } >
            <input
              className='form-control'
              type="text"
              placeholder='Search a hero'
              name='searchText'
              value={ searchText }
              onChange={ onInputChange }
              autoComplete='off'
            />

            <button className='btn btn-outline-primary mt-1'>search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* {
            ( q === '' )
            ? <div className="alert alert-primary">Search a hero</div>
            : ( heroes.length === 0 ) && <div className="alert alert-danger">There's no results with <b>{ q }</b></div>
          } */}

          <div className="alert alert-primary" style={{ display: showSearch ? '' : 'none'}}>Search a hero</div>

          <div className="alert alert-danger" style={{ display: showError ? '' : 'none' }}>There's no results with <b>{ q }</b></div>

          {
            heroes.map( hero => (
              <HeroCard key={hero.id} { ...hero } />
            ))
          }

        </div>
      </div>
    </>
  )
}