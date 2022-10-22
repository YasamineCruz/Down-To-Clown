import { Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {

    return (
        <div className='homepage-wrapper'>
        <div className='image-wrapper'>
        <img className='homepageRedBlob'src='https://secure.meetupstatic.com/next/images/blobs/red-blob.svg' alt='text'/>
        <img className='homepageYellowBlob' src='https://secure.meetupstatic.com/next/images/blobs/yellow-blob.svg' alt='text' />
        <img className='homepageGreenBlob' src='https://secure.meetupstatic.com/next/images/blobs/green-blob.svg' alt='text' />
        <img className='homepageScreenImg' src='https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640' alt='text'/>
        </div>
        <div className='homepageContent'>
            <div className='homepageText'>
                <h1 className='homepageTitle'>
                 Celebrating a month of real connections on Down To Clown
                </h1>
                <p className='homepageP'>
                 Whatever you’re looking to do this year, Down To Clown can help. For 20 years, people have turned to Meetup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.
                </p> 
            </div>
            <div className='homepageLinks'>
                <h2 className='homepageLink'>
                    <Link className='homepageLink' to='/events'>
                    <img className='homepageEGImg' src='https://media.istockphoto.com/photos/casual-catering-discussion-meeting-colleagues-concept-picture-id597940046?k=20&m=597940046&s=612x612&w=0&h=irwAsyP1cetL_qpXKN-VttDFGHTsS9jppZB0WUAXjQg=' alt=''/>
                    <div className='homepageEgText'>
                        <h3 className='EGText'>
                         Events   
                        </h3>
                        <i class="fa-solid fa-arrow-right homepageArrow"></i>
                    </div>
                    </Link>
                </h2>
                <h2 className='homepageLink'>
                    <Link className='homepageLink' to='/groups'>
                    <img className='homepageEGImg' src='https://media.istockphoto.com/photos/big-group-of-happy-friends-stands-together-on-city-street-with-raised-picture-id1364222624?b=1&k=20&m=1364222624&s=170667a&w=0&h=4DtkaDlcbvTxQmSxNTkhXEupXF0hZw50VEGot1cEocc=' alt=''/>
                        <div className='homepageEgText'>
                        <h3 className='EGText'>
                          Groups  
                        </h3>
                        <i class="fa-solid fa-arrow-right homepageArrow"></i>
                    </div>
                    </Link>  
                    </h2>
            </div>
        </div>
        </div>
    )
}

export default HomePage;