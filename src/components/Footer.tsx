const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            Guelmim Dalel – دليل كلميم
          </p>
          <p className="text-xs text-muted-foreground">
            دليلك داخل مدينة كلميم | Guide de la ville de Guelmim
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {new Date().getFullYear()} Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
