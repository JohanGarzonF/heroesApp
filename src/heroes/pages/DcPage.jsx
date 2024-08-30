import { HeroList } from '../components/HeroList'
const publisher = 'DC Comics'

export const DcPage = () => {
  return (
    <>
      <h1>Dc Comics</h1>
      <hr />

      <HeroList publisher={ publisher }/>
    </>
  )
}