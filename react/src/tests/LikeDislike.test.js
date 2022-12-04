import { customRenderAlreadLogin ,screen,fireEvent ,waitFor} from './test-utils';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import '@testing-library/jest-dom'
import ForEachPost from '../components/ForEachPost';

//Set up a fake server to the test
const server = setupServer(
    rest.get('http://localhost:4000/api/reactions',(req,res,ctx) =>{
        return res(ctx.json(
            []
        ))
    }),
    rest.get('http://localhost:4000/api/reactions/select/10/1',(req,res,ctx) =>{
        return res(ctx.json(null));

    }),
    rest.post('http://localhost:4000/api/reactions/create',(req,res,ctx)=>{
        return res(ctx.json(
            {
                user_id: 2,
                like: true,
                dislike: false,
                post_id: 1
            }
        ))
    }),
    rest.delete('http://localhost:4000/api/reactions/delete/10/1',(req,res,ctx)=>{
        return res(ctx.json("Successful delete !"));
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test ("Click like", async() =>{
    //set up the props to the page
    const testPost={
        post_id:1,
        post_pictureURL: null,
        post_delete:false,
        user_id: 1,
        user:{
            user_id: 1,
            user_name: "Ling"
        },
        replies:[

        ]
    }

    customRenderAlreadLogin(<ForEachPost 
        value={testPost} page={"allPost"} />);
    const likeButton = screen.getByText("thumb_up_off_alt");

    fireEvent.click(likeButton);
    //Now this post has 1 like 
    await waitFor(()=>{
        expect(screen.getByText("1")).toBeInTheDocument();
    })

});