import React, {useEffect, useState}from 'react';
import axios from 'axios';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CFormText,
    CTextarea,
    CInput,
    CInputFile,
    CLabel,
    CSelect,
    CRow,
    CAlert,
    CProgress,
    CInputGroupAppend,
    CInputGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
 
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { url } from '../../Url';

const AddNewBook = (props) => {
    //const [collapsed, setCollapsed] = React.useState(true)
    //const [showElements, setShowElements] = React.useState(true)

    //your code
    const [books, setBooks] = useState('');
    const [loading, setLoading] = useState(false);
    
    //for alerts
    const [feedback, setFeedback] = useState('');
    const [feedbackType, setFeedbackType] = useState('');
    const [visible, setVisible] = React.useState(10);
    
    //for modal
    const [modal, setModal] = useState(false);
    //Modal Input states
    const [categoryName, setCategoryName] = useState('');
    const [categorySearchResult, setCategorySearchResult] = useState('');


    //set token to url request
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common = { 'Authorization' : `Bearer ${token}` }

    //inputs
    const [title, setTitle] = useState('');
    const [isbn, setIsbn] = useState('');
    const [pages, setPages] = useState('');
    const [category, setCategory] = useState('');
    const [publishyear, setPublishyear] = useState('');
    const [publisher, setPublisher] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [amount, setAmount] = useState('');
    const [file, setFile] = useState('');
    
    
    
    
    
    //handling dynamic inputs 
    const [categoriesList, setCategoriesList] = useState([]);
    const [publisherList, setPublisherList] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    
    //handling dynamic inputs function
    async function getCategories() {
        await axios.get('http://localhost:8000/api/categories').then((response) => { 
            setCategoriesList(response.data); 
            //console.log(categoriesList);
        }).catch(error => console.log(`Error: ${error}`));
    }


    async function getPublishers() {
        await axios.get('http://localhost:8000/api/publishers').then((response) => { 
            setPublisherList(response.data);
            //console.log(publisherList);   
        }).catch(error => console.log(`Error: ${error}`));
    }

    async function getAuthors() {
        await axios.get('http://localhost:8000/api/authors').then((response) => {  
            setAuthorList(response.data); 
            //console.log(authorList);
        }).catch(error => console.log(`Error: ${error}`));
    }


    useEffect( ()  => {
        setLoading(true);

        getCategories();
        getPublishers();
        getAuthors();

        setLoading(false);
        
    }                   
    ,[]);

    
                    
    
    const normalBtn = (btn) =>{
        const adding = document.getElementById(btn); 
        adding.disabled = false;
        adding.color = " primary btn";
        adding.class += " btn ";
        
    }

    const loadingBtn = (btn) => {
        const adding = document.getElementById(btn);      
        adding.disabled = true;
        adding.innerText = 'Adding Now'; 
    }

    const disabledBtn = (btn) => {
        const adding = document.getElementById(btn);      
        adding.disabled = true;
    }
     

    
    const AddBook = async (e) => {
        e.preventDefault();
        loadingBtn('addBook');
        

        //formData 
        const formData = new FormData();
        formData.append('title', title);
        formData.append('isbn', isbn);
        formData.append('pages', pages);
        formData.append('category', category);
        formData.append('publish_year', publishyear);
        formData.append('publisher_id', publisher);
        formData.append('author_id', author);
        formData.append('desc', desc);
        formData.append('amount', amount);
        formData.append('file', file);


        //console.log(formData);
        
        await axios.post(url+'books', formData).then(response => { 
            if(response.data.status === 200){   
                setFeedback(response.data.message);
                setFeedbackType('success');
                normalBtn('addBook');
            }
            normalBtn('addBook');
        }).catch(error => {
            normalBtn('addBook');
            setFeedback(error.message);
            setFeedbackType('danger');
            
        });
   }

//////////////////////////// add category ///////////////////

    const AddCategory = async (e) => {
        e.preventDefault();
        loadingBtn('addCat');
       
        //formData 
        const formData = new FormData();
        formData.append('name', categoryName);

        await axios.post(url+'categories', formData).then(response => { 
            if(response.data.status === 200){   
                setFeedback(response.data.message);
                setFeedbackType('success');  
                normalBtn('addCat');
            }
            normalBtn('addCat');
        }).catch(error => {
            normalBtn('addCat');
            setFeedback(error.message);
            setFeedbackType('danger');
        });
    }

    ///////////////////search for a category
    const SearchCategory = async (e) => {
        e.preventDefault();
       
        await axios.get(url + 'categories/search/'+ categoryName).then(response => { 
            console.log(response.data.message);
            if(response.data.status === 200){   
                setCategorySearchResult(response.data.message);
                disabledBtn('addCat');
            }else{
                normalBtn('addCat'); 
            }
        }).catch(error => {
            normalBtn('addCat'); 
        });
    }


        
    return (
    <div>
    <CRow>
        <CCol xs="12" md="12">
        
           
          <CCard>
            <CCardHeader>
              Add a new 
              <small> Book</small>
            </CCardHeader>
            <CCardBody>
            
              <CForm onSubmit={AddBook}  className="form-horizontal" encType="multipart/form-data"> 
                <CFormGroup row>
                    

                    <CCol md="2">
                        <CLabel htmlFor="title">Book Title</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                        <CInput id="title" name="title" placeholder="Text" onChange={(e)=>{setTitle(e.target.value)}}/>
                        <CFormText>Provide title of the book</CFormText>
                    </CCol>

                    <CCol md="2">
                        <CLabel htmlFor="isbn">Book ISBN</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                        <CInput id="isbn" name="isbn" placeholder="Text" onChange={(e)=>{setIsbn(e.target.value)}} />
                        <CFormText>Provide ISBN of the book</CFormText>
                    </CCol>

                </CFormGroup>

                <CFormGroup row>
                    <CCol md="2">
                        <CLabel htmlFor="pages">Pages</CLabel>
                    </CCol>
                    <CCol xs="12" md="4">
                        <CInput id="pages" type="number" name="pages" placeholder="Text" onChange={(e)=>{setPages(e.target.value)}}  />
                        <CFormText>How many pages ?</CFormText>
                    </CCol>

                    <CCol md="2">
                        <CLabel htmlFor="selectLg">Category</CLabel>
                    </CCol>
                    <CCol xs="12" md="4" >
                        <CInputGroup>
                            <CSelect custom defaultValue="" name="selectLg" id="selectLg" onChange={(e)=>{setCategory(e.target.value)}} >
                                <option disabled hidden value="">Select One</option>
                                { !loading ? (categoriesList.map((category) => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                )) ) : null }  
                            </CSelect>
                            <CInputGroupAppend>
                                    <CButton onClick={() => setModal(!modal)} color="secondary">+</CButton>
                            </CInputGroupAppend>
                        </CInputGroup> 
                  </CCol>

                </CFormGroup>


                   




                <CFormGroup row>
                    <CCol md="2">
                        <CLabel htmlFor="date-input">Publish Year</CLabel>
                     </CCol>
                    <CCol xs="12" md="4">
                        <CInput type="date" id="date-input" name="date-input" placeholder="date" onChange={(e)=>{setPublishyear(e.target.value)}} />
                    </CCol>

                    <CCol md="2">
                        <CLabel htmlFor="selectLg">Publisher </CLabel>
                    </CCol>
                    <CCol xs="12" md="4" >         
                        <CSelect custom defaultValue="" name="selectLg" id="selectLg" onChange={(e)=>{setPublisher(e.target.value)}} >
                            <option disabled hidden value="">Select One</option>
                            {!loading ?  (publisherList.map((publisher) => (
                                <option value={publisher.id} key={publisher.id}>{publisher.name}</option>
                            )) ) : null }  
                        </CSelect>
                        <CFormText>Select Publisher ?</CFormText>
                  </CCol>

                </CFormGroup>

                <CFormGroup row>
                  <CCol md="2">
                    <CLabel htmlFor="textarea-input">Book Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="10">
                    <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Description ..." 
                      onChange={(e)=>{setDesc(e.target.value)}}
                    />
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                    <CCol md="1">
                        <CLabel htmlFor="title">Author</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                        <CSelect custom defaultValue=""   name="selectLg" id="selectLg" onChange={(e)=>{setAuthor(e.target.value)}} >
                            <option disabled hidden value="">Select One</option>
                            {!loading ?  (authorList.map((author) => (
                                <option value={author.id} key={author.id}>{author.name}</option>
                            )) ) : null }  
                        </CSelect>
                        <CFormText>Provide Author of the book</CFormText>
                    </CCol>

                    <CCol md="1">
                        <CLabel htmlFor="isbn">Amount Avaiable</CLabel>
                    </CCol>
                    <CCol xs="12" md="3">
                        <CInput id="isbn" type="number" name="isbn" placeholder="Text" onChange={(e)=>{setAmount(e.target.value)}} />
                        <CFormText>Amount of books avaiable</CFormText>
                    </CCol>

                    <CLabel col md="1" htmlFor="file-input">Select Book</CLabel>
                    <CCol xs="12" md="3">
                        <CInputFile id="file-input" name="file" onChange={(e)=>{setFile(e.target.files[0])}}/>
                    </CCol>

                </CFormGroup>
            </CForm>

            </CCardBody>
            {feedback ? (
                <CCol xs="12" md="12">
                    <CAlert color={feedbackType} show={visible} closeButton onShowChange={setVisible}>
                        {feedback} - closing in {visible}s!
                        <CProgress striped color={feedbackType} value={Number(visible) * 10} size="xs" className="mb-3"/>
                    </CAlert>
                </CCol>
                ) 
            : null}
            <CCardFooter>
              <CButton type="submit" id="addBook" onClick={AddBook} size="sm" color="primary"><CIcon name="cil-scrubber" /> Add Now </CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>

        </CCol>
      </CRow>



    <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
            <CModalTitle>Add Category</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CInput onKeyUp={SearchCategory} id="categoryName" name="categoryName" placeholder="Text" onChange={(e)=>{setCategoryName(e.target.value)}}/>
            <CFormText> { categorySearchResult ? ( <div> <span style={{color: "red", fontWeight:600, fontSize: '20px'}}> {categorySearchResult}  </span> already exsists </div> ) : 'Provide category name' } </CFormText>   
        </CModalBody>
        {feedback ? (
                <CCol xs="12" md="12">
                    <CAlert color={feedbackType} show={visible} closeButton onShowChange={setVisible}>
                        {feedback} - closing in {visible}s!
                        <CProgress striped color={feedbackType} value={Number(visible) * 10} size="xs" className="mb-3"/>
                    </CAlert>
                </CCol>
                ) 
        : null}
        <CModalFooter>
            <CButton onClick={AddCategory} id="addCat" color="primary">Add Category</CButton>{' '}
            <CButton color="secondary" onClick={() => setModal(false)}>Cancel</CButton>
        </CModalFooter>
    </CModal>




    








      </div>



        );
    
}

export default AddNewBook
