import { customRenderAlreadLogin ,  screen,fireEvent , waitFor} from './test-utils';
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import '@testing-library/jest-dom'
import EditProfile from '../pages/EditProfile';

//Set up a fake server to the test
const server = setupServer(
    rest.put('http://localhost:4000/api/users/update',(req,res,ctx)=>{
        return res(ctx.json)(
            {
                user_id: 10,
                user_name: "newName",
                user_email:"newEmail@gmail.com",
                user_password:"testUserPassword"
            }
        )
    }),
    rest.get('http://localhost:4000/api/users', (req,res,ctx) =>{
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
    }),


);


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());



test("Failure update", async() =>{
    customRenderAlreadLogin(
        <EditProfile/>
    );

   const newName = screen.getByPlaceholderText(/Enter name/i);
   const nameValue = "newName";
   fireEvent.change(newName, {target: {value: nameValue}});


   const newEmail = screen.getByPlaceholderText(/Enter email/i);
   const emailValue = "test@gmail.com";
   fireEvent.change( newEmail, {target: {value: emailValue}});

   fireEvent.click(screen.getByText("Submit"));
    //check the repeat email can not be change 
    await waitFor(()=>{
        expect(screen.getByText("Email already been used, pls change it !")).toBeInTheDocument();
    })

})

