import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.window.localStorage = {
  getItem: (item) => 'eyJ1c2VyIjp7fSwidG9rZW4iOiIifQ==',
  setItem: (key, value) => null
}