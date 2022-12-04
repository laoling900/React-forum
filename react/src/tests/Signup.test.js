import { customRender ,screen,fireEvent , waitFor} from './test-utils';
import Signup from "../pages/Signup";
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import '@testing-library/jest-dom'

//Set up a fake server to the test
const server = setupServer(
    rest.post('http://localhost:4000/api/users', (req,res,ctx) =>{
        return res(ctx.json(
            {
                user_id:  15,
                user_name: "test", 
                user_email: "test@gmail.com",
                user_password: "testpassword",
                
            }
        ))
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


test("Successful Signup", async ()=>{
    customRender(<Signup />);
    //fill all blank
   fireEvent.change(screen.getByPlaceholderText(/Enter name/i), {target: {value: "testName"}});
   fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {target: {value: "testtest@gmail.com"}});
   fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {target: {value: "Aa$12345678"}});
   fireEvent.change(screen.getByPlaceholderText(/Enter RepeatPassword/i), {target: {value: "Aa$12345678"}});
    
        //expect()
    //click submit 
    fireEvent.click(screen.getByText("Submit"))
    await waitFor(()=>{
        expect(screen.getByText("Successful Signup !") ).toBeInTheDocument();
    })
});


test("Failure Signup", async ()=>{
    customRender(<Signup />);
    //fill all blank
   fireEvent.change(screen.getByPlaceholderText(/Enter name/i), {target: {value: "testName"}});
   fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {target: {value: "test@gmail.com"}});
   fireEvent.change(screen.getByPlaceholderText(/Enter password/i), {target: {value: "Aa$12345678"}});
   fireEvent.change(screen.getByPlaceholderText(/Enter RepeatPassword/i), {target: {value: "Aa$12345678"}});
    
        //expect()
    //click submit 
    fireEvent.click(screen.getByText("Submit"))
    await waitFor(()=>{
        expect(screen.getByText("Email already been used, pls change it !") ).toBeInTheDocument();
    })
});
