import {useState, useEffect} from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

//CSS
import styles from './ProjectForm.module.css'


function ProjectForm({ handleSubmit, btnText, projectData }) {
   const[categories, setCategories] = useState([])
   const[project, setProject] = useState(projectData || {})

   useEffect (() => {
      fetch("http://localhost:5000/categories", {
         method: "GET",
         headers: {
            'Content-Type': 'application/json'
         }
      })
      .then((resp) => resp.json())
      .then ((data) => {
         setCategories(data)
      })
      .catch((err) => console.log(err))
   }, [])

   const submit = (e) => {
      e.preventDefault()
      //console.log (project)
      handleSubmit(project)
   }

   function handleChange(e){
      setProject({...project, [e.target.name]: e.target.value })
   }

   function handleCategory(e){
      setProject({
         ...project, 
         category: {
            id: e.target.value, //id da categoria que vai ser o input
            name: e.target.options[e.target.selectedIndex].text //acessa a opção que foi selecionada pelo usuario
         },
      })
   }

   return (
      <form onSubmit={submit} 
      className={styles.form}>
         <Input 
            type="text" 
            text="Nome do Projeto" 
            name="name" 
            placeholder="Insira o nome do projeto" 
            handleOnChange={handleChange}
            value={project.name ? project.name : ''}

         />
          <Input 
            type="number" 
            text="Orçamanto do projeto" 
            name="budget" 
            placeholder="Insira o Orçamento Total" 
            handleOnChange={handleChange}
            value={project.budget ? project.budget : ''}
         />
         <Select name="category_id" text="Selecione a Categoria"
         options={categories}
         handleOnChange={handleCategory}
         value={project.category ? project.category.id : ''}
         />
         <SubmitButton text={btnText}/>
      </form>
   )
}

export default ProjectForm