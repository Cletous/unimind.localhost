import Posts from "../components/Posts"
import SharePost from "../components/SharePost"

const Home = () => {
  return (
    <div className="home">      
      <SharePost/>
      <Posts/>
    </div>
  )
}

export default Home