#!/usr/bin/python

"""
Export glyphs from a font file into a theme directory with each glyph
saved as its own svg file.
"""

import fontforge
import sys, os, optparse

from os import path

from os.path import basename

from pprint import pprint, pformat

def get_parser( ):
  parser = optparse.OptionParser( )
  parser.add_option('-t', '--type',
                    default="ttf,svg,woff",
                    help="Write glyphs to this directory.")
  parser.add_option('-p', '--path',
                    default="./",
                    help="Write glyphs to this directory.")
  return parser


class Inspector(object):
  def __init__(self, options, args):
    self.options = options
    self.args = args

  def run(self):
    for font in self.args:
      self.convert(font)

  def convert(self, name):
    font = fontforge.open(name)
    types = self.options.type.split(',')
    cwd = self.options.path
    name = basename(path.splitext(name)[0])
    for type in types:
      fpath = path.join(cwd, name + '.' + type)
      font.generate(fpath)

def main(*args):
  parser = get_parser( )
  (options, args) = parser.parse_args(list(args))
  prog, args = args[0], args[1:]

  app = Inspector(options, args)
  app.run( )

if '__main__' == __name__:
  main(*sys.argv)

#####
# EOF