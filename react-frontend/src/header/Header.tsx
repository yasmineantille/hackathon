import {SyntheticEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import logo from '/src/assets/zuhlke-logo-rgb.png';
import {Link} from 'react-router-dom';
import {slide as Menu} from 'react-burger-menu';
import Button from '../shared/Button.tsx';

const HeaderSection = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0.5rem;
  background-color: white;
  z-index: 1;
`;

const Logo = styled.img`
  height: 4rem;
  float: left;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  padding: 0.8rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  padding-left: 1rem;
  margin: 0 0 0 0;
  color: var(--secondary);
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const HamburgerMenuPlaceholder = styled.div`
  width: 36px;
  height: 30px;
  padding: 18px;
`;

const hamburgerMenuStyles = {
  table: {
    width: '140%',
    row: {
      width: '4rem',
    },
  },
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    background: '#373a47',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#373a47',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#f0f0f0',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmItem: {
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

export interface SanitizationMapRow {
  key: string;
  value: string;
}

export interface SubstitutionJSON {
  [key: string]: string;
}

export default function Header() {

  const [isOpen, setOpen] = useState(false);
  const [showingMapEditor, setShowingMapEditor] = useState(false);
  const [currentSubstitutionMap, setCurrentSubstitutionMap] = useState<SanitizationMapRow[]>([]);

  useEffect(() => {
    getCurrentMap();
  }, []);

  const getCurrentMap = () => {
    const map = localStorage.getItem('substitutionMap');
    const result: SanitizationMapRow[] = [];

    if (map) {
      const parsedMap = JSON.parse(map);

      Object.entries(parsedMap).forEach((entry) => {
        result.push({key: entry[0], value: entry[1] as string});
      });

      setCurrentSubstitutionMap(result);
    }
  };

  const renderKeys = (parsedMap: SanitizationMapRow[]) => {
    return parsedMap.map((entry, index) => {
      return (
        <tr>
          <td>
            <input style={hamburgerMenuStyles.table.row}
                   defaultValue={entry.key}
                   type={'text'}
                   onChange={(event) => onInputKeyChange(event, index)}
            />
          </td>
          <td>
            <input style={hamburgerMenuStyles.table.row}
                   defaultValue={entry.value}
                   type={'text'}
                   onChange={(event) => onInputValueChange(event, index)}
            />
          </td>
          <td>
            <Button onClick={() => deleteEntry(entry, index)}> Del </Button>
          </td>
        </tr>
      );
    });
  };

  const toNewString = (input: SanitizationMapRow[]) => {
    const newObj: SubstitutionJSON = {};

    input.forEach(rule => newObj[rule.key] = rule.value);
    return newObj;
  };
  const onInputKeyChange = (event: SyntheticEvent, index: number) => {
    const newVal = (event.nativeEvent.target as HTMLInputElement).value;
    const copyOfState = [...currentSubstitutionMap];
    copyOfState[index].key = newVal;

    const stringForLocalStorage = JSON.stringify(toNewString(copyOfState));
    localStorage.setItem('substitutionMap', stringForLocalStorage);
  };

  const onInputValueChange = (event: SyntheticEvent, index: number) => {
    const newVal = (event.nativeEvent.target as HTMLInputElement).value;

    const copyOfState = [...currentSubstitutionMap];
    copyOfState[index].value = newVal;

    const stringForLocalStorage = JSON.stringify(toNewString(copyOfState));
    // setCurrentSubstitutionMap([...copyOfState]);
    console.log('val ', toNewString(copyOfState));
    localStorage.setItem('substitutionMap', stringForLocalStorage);
  };

  const deleteEntry = (entry: SanitizationMapRow, index: number) => {
    const copyOfState = [...currentSubstitutionMap];
    copyOfState.splice(index,1);

    setCurrentSubstitutionMap(copyOfState);

    const stringForLocalStorage = JSON.stringify(toNewString(copyOfState));
    localStorage.setItem('substitutionMap', stringForLocalStorage);
  };

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <>
      <Menu right styles={hamburgerMenuStyles} isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
        {showingMapEditor
          ? (
            <table style={hamburgerMenuStyles.table}>
              {renderKeys(currentSubstitutionMap)}
            </table>
          ) : (<>
            <NavLink to="/" onClick={closeSideBar}>
              Home
            </NavLink>
            <NavLink to="/other" onClick={closeSideBar}>
              Other Page
            </NavLink>
            <NavLink to="https://github.com/yasmineantille/hackathon">Github</NavLink>

            <Button onClick={() => setShowingMapEditor(true)}> Edit sanitize map</Button>
          </>)
        }
      </Menu>

      <HeaderSection>
        <Link to="/">
          <Logo src={logo} alt="Logo"/>
        </Link>
        <NavLink to="/">
          <Title>AInspectr</Title>
        </NavLink>
        <HamburgerMenuPlaceholder></HamburgerMenuPlaceholder>
      </HeaderSection>
    </>
  );
}
