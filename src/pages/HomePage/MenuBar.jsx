import { Menu, MenuItem, MenuButton } from "../../components/ui/menubar";

function MenuBar() {
  return (
    <Menu as="nav">
      <MenuButton as="button">Menu</MenuButton>
      <Menu.Items as="ul" style={{ display: "flex", flexDirection: "column" }}>
        <Menu.Item as="li">
          <MenuItem>Home</MenuItem>
        </Menu.Item>
        <Menu.Item as="li">
          <MenuItem>About</MenuItem>
        </Menu.Item>
        <Menu.Item as="li">
          <MenuItem>Services</MenuItem>
        </Menu.Item>
        <Menu.Item as="li">
          <MenuItem>Contact</MenuItem>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}

export default MenuBar;
