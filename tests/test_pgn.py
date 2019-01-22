import pytest
from src import PGN
import os

def test_parse_headers():
    path = os.path.dirname(__file__)
    filename = os.path.join(path, "test.pgn")
    pgn = PGN.from_file(filename)

    assert pgn.event == '\"F/S Return Match\"'
    assert pgn.site == '\"Belgrade, Serbia JUG\"'
    assert pgn.date == '\"1992.11.04\"'
    assert pgn.round == '\"29\"'
    assert pgn.white == '\"Fischer, Robert J.\"'
    assert pgn.black == '\"Spassky, Boris V.\"'
    assert pgn.result == '\"1/2-1/2\"'


def test_parse_movetext():
    path = os.path.dirname(__file__)
    filename = os.path.join(path, "test.pgn")
    pgn = PGN.from_file(filename)

    # don't include result in movetext dict
    assert len(pgn.movetext.keys()) == 43
    