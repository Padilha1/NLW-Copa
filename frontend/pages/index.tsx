
interface HomeProps{
  count: number
}

export default function Home(props: HomeProps) {

  return (
    <div>
      <h1>Hallo Welt</h1>
      <h2>Já temos mais de {props.count} bolões</h2>
    </div>
  )
}


export const getServerSideProps = async ()  => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()
  console.log(data)

  return {
    props: {
      count: data.count,
    }
  }
}