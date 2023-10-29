const Menu = require('../models/menu.model')

async function createMenu(req, res) {
  const menu = new Menu(req.body)

  menu.save((error, menuStored) => {
    if (error) {
      res.status(400).send({ msg: 'erro al crear el menu' })
    } else {
      res.status(200).send(menuStored)
    }
  })
}

async function getMenus(req, res) {
  const { active } = req.body

  let response = null

  if (active === undefined) {
    response = await Menu.find().sort({ order: 'asc' })
  } else {
    response = await Menu.find({ active }).sort({ order: 'asc' })
  }

  if (!response) {
    res.status(400).send({ msg: 'no se ha econtrado ningún menu' })
  } else {
    res.status(200).send(response)
  }
}

async function updateMenu(req, res) {
  // AQUI QUEDE PÁGINA 148 ACUTALIZANDO MENÚ :v
  const { id } = req.params
  const menuData = req.body

  Menu.findByIdAndUpdate({ _id: id }, menuData, (error) => {
    if (error) {
      res.status(400).send({ msg: 'error al actualizar el menu' })
    } else {
      res.status(200).send({ msg: 'actualización correcta' })
    }
  })
}


async function deleteMenu(req,res){
  const { id} = req.params

  Menu.findByIdAndDelete(id,(error)=>{
    if(error){res.status(400).send({msg:'error al eliminar el menu'})}
    else{res.status(200).send({ msg: 'menu eliminado correctamente'})}
  })
}

module.exports = {
  createMenu,
  getMenus,
  updateMenu,
  deleteMenu,
}
