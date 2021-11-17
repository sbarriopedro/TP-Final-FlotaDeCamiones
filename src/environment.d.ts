declare global {
    namespace NodeJS {
      interface ProcessEnv {
        CNX_STR: string;
        EMAILUSUARIO: string;
        EMAILPASSWORD: string;

      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}