import { customRenderAlreadLogin ,screen,fireEvent , waitFor} from './test-utils';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import '@testing-library/jest-dom'
import MyProfile from '../pages/Profile';

//Set up a fake server to the test
const server = setupServer(
    rest.delete('http://localhost:4000/api/users/delete/:id', (req,res,ctx)=>{
        return res(ctx.json(
            [

                {
                    user_id: 10,
                    user_name: "testDeleteUer",
                    user_email:"testDelete@gmail.com",
                    user_password:"testDeletePassword"
                }

            ]
        ))
    }),
    rest.put('http://localhost:4000/api/users/update',(req,res,ctx) =>{
        return res(ctx.json(
            [{
                user_id:  15,
                user_name: "test", 
                user_email: "test@gmail.com",
                user_password: "testpassword",
              },
              {
                user_id:  8,
                user_name: "test2", 
                user_email: "test2222@gmail.com",
                user_password: "testpassword222",
              },
            ] 
        ))
    })
);

beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Successful delete", async() =>{

    customRenderAlreadLogin(  <MyProfile />);
    
    fireEvent.click(screen.getByText("delete"));
  
    await waitFor(()=>{
        expect(fireEvent.click(screen.getByText("CONFIRM"))).toBe(false);
    })
});


