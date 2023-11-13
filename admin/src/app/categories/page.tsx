"use client"
import { useEffect, useState } from "react"
import { Category } from "@/src/models/categories";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Categories() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [parentCategory, setParentCategory] = useState<Category | null>()
    const [modifyCategory, setModifyCategory] = useState<Category | null>();
    const [properties, setProperties] = useState([]);

    useEffect(() =>{
      getCategories();
    },[]);
    
    async function getCategories(){
      const response = await fetch("http://localhost:3000/api/categories")
      setCategories(await response.json());
    }

    async function saveCategory(ev : any){
      ev.preventDefault();
      let response
      const prop = properties.map(p => ({
          name: p.name,
          values: p.values.split(','),
        }));
      if(modifyCategory) {
        // edit Category
        const _id = modifyCategory._id
        response = await fetch('http://localhost:3000/api/categories',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name, parentCategory ,prop,_id
          })
        })
        setModifyCategory(null);
      } else{
        // new Category
          response = await fetch('http://localhost:3000/api/categories',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name, parentCategory,prop
            })
          })
        }
      setName('');
      setParentCategory(null),
      setProperties([]);
      getCategories();
    }

    function editCategory(category : Category){
      setModifyCategory(category);
      setName(category.name);
      setParentCategory(category.parent?._id as any);
      setProperties(category.properties?.map(({name, values}) =>({
        name,
        values: values.join(',')
      })))
    }

    async function deleteCategory(category: Category){
      let id = category._id
      const res = await fetch("http://localhost:3000/api/categories", {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
      getCategories();
    }

   function addProperty(){
    setProperties(prev => {
      return [...prev, {name:'', values:''}];
    })
   }

   function updatePropName(index, property, newName){
      setProperties(prev =>{
        const properties = [...prev];
        properties[index].name = newName;
        return properties;
      });
   }
   
   function updatePropValues(index, property, newValues){
      setProperties(prev =>{
        const properties = [...prev];
        properties[index].values = newValues;
        return properties;
      });
   }

   function removeProperty(index){
    setProperties(prev =>{
      const newProps = [...prev].filter((p, pIndex) =>{
        return pIndex !== index;
      });
      return newProps;
    });
   }

  return (
        <>
            <h1>Categories</h1>
            <label>
              {modifyCategory
                ? `Edit category ${modifyCategory.name}` 
                : 'Create new category'}
            </label>
            <form onSubmit={saveCategory}>
              <div className='flex gap-1'>
                
                <input className="mb-0" type="text" placeholder={'Category name'}
                    onChange={ev => setName(ev.target.value)}
                    value={name} />
                    
                    <select className="mb-0" 
                      value={parentCategory as any}
                      onChange={ev => setParentCategory(ev.target.value as any)}>

                        <option value="">No parent Category</option>

                        {categories.length > 0 && categories.map(
                          category => (
                            <option value={category._id}>{category.name}</option>
                          )
                        )}
                    </select>
              </div>

              <div className="mb-2">
                <label className="block">Properties</label>
                  
                  <button 
                    type='button' className="btn-default text-sm mb-2"
                    onClick={addProperty}>
                    Add new Property
                  </button>

                  {properties.length > 0 && properties.map((prop, index) =>(
                    <div className="flex gap-1 mb-2">
                    
                      <input className="mb-0"
                        type="text" value={prop.name}
                        placeholder="property name (exemple: color)"
                        onChange={(ev) =>updatePropName(index, prop, ev.target.value)} />
                      
                      <input className="mb-0"
                        type="text" value={prop.values}
                        placeholder="values, comma, separated"
                        onChange={(ev) =>updatePropValues(index, prop, ev.target.value )} />
                      
                      <button className="btn-default"
                        type="button"
                        onClick={()=>removeProperty(index)}>
                          Remove
                      </button>
                    </div>
                  ))}
              </div>
              <div className="flex gap-1">
                {modifyCategory && (
                  <button className="btn-default"
                    type="button"
                    onClick={() => {
                      setModifyCategory(null);
                      setName('');
                      setParentCategory(null);
                      setProperties([])}}>
                    Cancel
                  </button>
                )}
      
              <button className="btn-primary py-1"
                type="submit">
                  Save
                </button>
              </div>
            </form>
            
            {!modifyCategory && (
              <table className="basic mt-4">
                <thead>
                  <tr>
                    <td>Category name</td>
                    <td>Parent category</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 && categories.map(
                    category => (
                      <tr>
                        <td>{category.name}</td>
                        <td>{category?.parent?.name}</td>
                        <td>
                          <button className="btn-primary mr-1"
                            onClick={() => editCategory(category)}>
                              Edit
                          </button>
                          <Popup
                            trigger={<button className="btn-primary">Delete</button>}
                          >
                            <div className="flex flex-center">
                              <p>Do you want to delete <b>{category.name}</b>?</p>
                              <button className="btn-red" onClick={()=>deleteCategory(category)}>Yes</button>
                            </div>
                          </Popup>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
        </>
  )
}

export default Categories