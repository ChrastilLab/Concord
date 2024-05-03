import { Sidebar } from '../components/sidebar/sidebar'
import {RightSideBar} from '../components/rightsidebar/rightsidebar'
import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../components/ui/dialog";
import {Label} from "../components/ui/label";
import {Input} from "../components/ui/input";
import {Button} from "../components/ui/button";
import { PlusIcon } from '../components/icons/plus'

const CardButton = () => {
  const [show, setShow] = useState(false)

  const buttonOnClick = () => {
    console.log("click")
    setShow(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="shadow mr-6 mt-8 flex justify-center items-center	">
          {/* <div className="w-full h-[128px] bg-green-700 rounded-3xl" onClick={buttonOnClick}> */}
          <PlusIcon w={24} h={24} />
          {/* <Button variant="outline">Edit Profile</Button> */}
          {/* </div> */}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const GridCard = ({ title, cards }) => {
  return (
    <div className="flex flex-col bg-white h-screen px-[36px] py-[36px]">
      <h1 className=" text-2xl">{title}</h1>

      <div className="grid grid-cols-3 bg-white pt-8">
        {
          cards.map((card, index) => {
            return (
              <div key={index} className="shadow mr-6">
                <div className="w-full h-[128px] bg-green-700"></div>
                <div className="px-4 py-4">
                  <p className="">{card.title}</p>
                  <p className="text-lg text-gray-600 ">{card.desc}</p>
                  <p className="text-sm text-gray-500">{card.time}</p>
                </div>
              </div>
            )
          })
        }
        <CardButton />
      </div>
    </div>
  )
}


const MainContent = () => {

  const cards = [
    {
      title: "title1",
      desc: "desc2",
      image: "image",
      time: "Spring 2024",
      notify: 0
    },
    {
      title: "title2",
      desc: "desc2",
      image: "image",
      time: "Spring 2024",
      notify: 0
    },
    {
      title: "title3",
      desc: "desc3",
      image: "image",
      time: "Spring 2024",
      notify: 0
    }
  ]

  return (
    <div className="w-full bg-purple-500 h-screen">

      <GridCard title="Display" cards={cards} />
    </div>
  )
}

const Header = () => {
  return (
    <div className="w-full bg-green-500 h-[96px]">header</div>
  )
}
const Page = () => {
  return (
    <div className="w-full bg-blue-500 ">
      <Header />
      <MainContent />
    </div>
  )
}
const Content = () => {
  return (
    <div className="w-full flex flex-row">

      <Page />
      <RightSideBar />
    </div>
  )
}
export default function MainPage() {
    return <div className="w-full flex flex-row h-screen">
        <Sidebar/>
        <Content/>
    </div>
}
