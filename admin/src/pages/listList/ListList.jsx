import './listList.css'
import { DeleteOutline } from '@mui/icons-material';
import { Link} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ListContext } from "../../context/listContext/ListContext";
import { DataGrid } from '@mui/x-data-grid';
import { deleteList, getLists } from '../../context/listContext/apiCalls';


export default function ListList() {
    const {lists, dispatch} = useContext(ListContext);    

    useEffect(()=>{ 
      getLists(dispatch)
    }, [dispatch])

    const handleDelete = (id) =>{
      deleteList(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'title', headerName: 'Title', width: 250 },
        { field: 'genre', headerName: 'Genre', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params)=>{
                return(
                    <>
                        <Link to={'/list/'+params.row._id} state={{list: params.row}}>
                            <button className='productListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={()=>handleDelete(params.row._id)} />
                    </>
                )
            }
        },
        
      ];
  return (
    <div className='productList'>
      <DataGrid
        rows={lists}
        columns={columns}
        getRowId={(row) => row._id}
        disableRowSelectionOnClick
        sortModel={[
          {
            field: 'title', 
          },
        ]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        checkboxSelection
      />
    </div>
  )
}
