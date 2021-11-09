import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import clsx from 'clsx';
import React, { ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineSchedule } from 'react-icons/ai';
import { BsDot } from 'react-icons/bs';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiUser,
  FiSettings,
  FiMenu,
  FiMoon,
  FiSun,
  FiBell,
  FiFilm,
  FiBox,
  FiChevronDown,
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
interface LinkItemProps {
  name: string;
  icon: IconType;
  to?: string;
  accor?: boolean;
  linkChild?: LinkItemProps[];
}

const LinkItems = () => {
  const { checkAccess } = useAuthorization();

  const navigation = [
    { name: 'Trang chủ', icon: FiHome, to: '/dashboard' },
    checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
      name: 'Phim',
      icon: FiFilm,
      to: '/managemovie',
    },
    checkAccess({ allowedRoles: [ROLES.ADMIN, ROLES.MANAGER] }) && {
      name: 'Doanh thu',
      icon: FiTrendingUp,
      to: '/revenue',
    },
    {
      name: 'Rạp',
      icon: FiCompass,
      accor: true,
      linkChild: [
        {
          name: 'Danh sách rạp',
          icon: BsDot,
          to: '/cinema/list',
        },
      ],
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: 'Phòng',
      icon: FiBox,
      accor: true,
      linkChild: [
        {
          name: 'List',
          icon: BsDot,
          to: '/room/listRoom',
        },
        {
          name: 'Create',
          icon: BsDot,
          to: '/room/createRoom',
        },
      ],
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: 'Lịch chiếu',
      icon: AiOutlineSchedule,
      to: '/showtimes/create',
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER] }) && {
      name: 'Nhân viên',
      icon: FiUser,
      to: '/users',
    },
    checkAccess({ allowedRoles: [ROLES.MANAGER, ROLES.USER] }) && {
      name: 'Bán vé',
      icon: FiStar,
      to: '/seller',
    },
    { name: 'Cài đặt', icon: FiSettings, to: '/as' },
  ].filter(Boolean) as LinkItemProps[];

  return (
    <>
      {navigation.map((link) => {
        if (link.accor) {
          return <LinkAccor key={link.name} {...link} />;
        }
        return (
          <NavItem key={link.name} icon={link.icon} href={link.to as string}>
            {link.name}
          </NavItem>
        );
      })}
    </>
  );
};

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} py={4}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      // transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      overflowX="scroll"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Movieer CMS
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <LinkItems />
    </Box>
  );
};

const LinkAccor = (link: LinkItemProps) => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <AccordionButton
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexGrow={1}
          role="group"
          cursor="pointer"
          p="4"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          className="link-item"
          _expanded={{}}
        >
          {link.icon && (
            <Icon
              flexShrink={0}
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={link.icon}
            />
          )}
          <Text flex="1 1 auto" textAlign="left">
            {link.name}
          </Text>
          <AccordionIcon ml="2" />
        </AccordionButton>
        <AccordionPanel>
          {link.linkChild &&
            link.linkChild.map((l, index) => (
              <NavItem
                key={index}
                icon={l.icon}
                href={l.to as string}
                m="0"
                mb="2"
                classes="link-item-child"
                color="gray.400"
              >
                {l.name}
              </NavItem>
            ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
  classes?: string;
}
const NavItem = ({ icon, children, href, classes, ...rest }: NavItemProps) => {
  return (
    <NavLink to={href} style={{ textDecoration: 'none' }} activeClassName="active-link">
      <Flex
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        className={clsx('link-item', classes)}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            transition="transform 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            as={icon}
            className={classes && 'link-icon'}
          />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { logout, user } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Movieer CMS
      </Text>

      <HStack spacing={{ base: '0', md: '4' }}>
        <IconButton size="lg" variant="ghost" aria-label="toogle theme" icon={<FiBell />} />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="toogle theme"
          icon={colorMode === 'light' ? <FiSun /> : <FiMoon />}
          onClick={toggleColorMode}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.profile.fullName}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
