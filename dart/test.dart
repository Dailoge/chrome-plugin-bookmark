test(c, {bool a, bool b}) {
  print('a=$a,b=$b,c=$c');
}
void main() {
  test(true, a: false, b: false);
}
